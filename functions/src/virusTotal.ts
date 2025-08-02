/**
 * VirusTotal integration - CF01 & CF02
 * Owner: Shared - VT scanning functionality
 */

import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// CF01: Upload file to VirusTotal
export const vtScanOnUpload = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const fileName = filePath?.split('/').pop();
  
  if (!filePath || !fileName) {
    console.error('Invalid file path or name');
    return;
  }
  
  // Only process files in 'vt-scans/' folder
  if (!filePath.startsWith('vt-scans/')) {
    return;
  }
  
  const fileSize = parseInt(object.size || '0');
  const maxSize = 32 * 1024 * 1024; // 32 MB limit
  
  if (fileSize > maxSize) {
    console.error(`File too large: ${fileSize} bytes`);
    return;
  }
  
  try {
    const db = getFirestore();
    const storage = getStorage();
    
    // Get file content
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    const [fileBuffer] = await file.download();
    
    // Submit to VirusTotal
    const vtResponse = await submitToVirusTotal(fileBuffer, fileName);
    
    // Extract user ID from file path
    const userId = filePath.split('/')[1];
    
    // Save scan record
    await db.collection('users').doc(userId).collection('vtScans').add({
      fileName,
      fileHash: vtResponse.sha256,
      status: 'scanning',
      analysisId: vtResponse.id,
      uploadedAt: new Date(),
      filePath,
    });
    
    console.log(`VT scan submitted: ${vtResponse.id}`);
    
  } catch (error) {
    console.error('VT upload error:', error);
  }
});

// CF02: Poll VirusTotal results
export const pollVtResult = functions.pubsub
  .schedule('every 2 minutes')
  .onRun(async (context) => {
    const db = getFirestore();
    
    // Get all pending scans
    const pendingScansQuery = await db.collectionGroup('vtScans')
      .where('status', '==', 'scanning')
      .where('uploadedAt', '>', new Date(Date.now() - 24 * 60 * 60 * 1000)) // Last 24h
      .get();
    
    const promises = pendingScansQuery.docs.map(async (doc) => {
      const scanData = doc.data();
      
      try {
        const result = await getVirusTotalResult(scanData.analysisId);
        
        if (result.status === 'completed') {
          // Update scan record
          await doc.ref.update({
            status: 'completed',
            verdict: result.verdict,
            detections: result.detections,
            totalEngines: result.totalEngines,
            completedAt: new Date(),
          });
          
          // Award XP if malicious found
          if (result.verdict === 'malicious') {
            await awardVtXp(doc.ref.parent.parent!.id, 10);
          }
          
          console.log(`VT scan completed: ${scanData.analysisId}`);
        }
        
      } catch (error) {
        console.error(`VT poll error for ${scanData.analysisId}:`, error);
        
        // Mark as error after too many attempts
        if (scanData.uploadedAt < new Date(Date.now() - 2 * 60 * 60 * 1000)) {
          await doc.ref.update({
            status: 'error',
            error: 'Polling timeout',
          });
        }
      }
    });
    
    await Promise.all(promises);
  });

// Helper functions
async function submitToVirusTotal(fileBuffer: Buffer, fileName: string) {
  const VT_API_KEY = process.env.VT_API_KEY;
  const formData = new FormData();
  formData.append('file', new Blob([fileBuffer]), fileName);
  
  const response = await fetch('https://www.virustotal.com/api/v3/files', {
    method: 'POST',
    headers: {
      'x-apikey': VT_API_KEY!,
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`VT API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data;
}

async function getVirusTotalResult(analysisId: string) {
  const VT_API_KEY = process.env.VT_API_KEY;
  
  const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
    headers: {
      'x-apikey': VT_API_KEY!,
    },
  });
  
  if (!response.ok) {
    throw new Error(`VT API error: ${response.status}`);
  }
  
  const data = await response.json();
  const attributes = data.data.attributes;
  
  const stats = attributes.stats;
  const malicious = stats.malicious || 0;
  const suspicious = stats.suspicious || 0;
  const total = Object.values(stats).reduce((sum: number, count) => sum + (count as number), 0);
  
  let verdict = 'clean';
  if (malicious > 0) verdict = 'malicious';
  else if (suspicious > 0) verdict = 'suspicious';
  
  return {
    status: attributes.status === 'completed' ? 'completed' : 'scanning',
    verdict,
    detections: malicious,
    totalEngines: total,
  };
}

async function awardVtXp(userId: string, xp: number) {
  const db = getFirestore();
  
  await db.runTransaction(async (transaction) => {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await transaction.get(userRef);
    
    if (userDoc.exists) {
      const currentXp = userDoc.data()?.xp || 0;
      const newXp = currentXp + xp;
      const newLevel = Math.floor(Math.sqrt(newXp / 25)) + 1;
      
      transaction.update(userRef, {
        xp: newXp,
        level: newLevel,
      });
    }
  });
}