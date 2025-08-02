/**
 * Have I Been Pwned integration - CF09 & CF10
 * Owner: Shared - HIBP breach monitoring
 */

import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

// CF09: Check single email for breaches
export const checkPwnedEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const { email } = data;
  const userId = context.auth.uid;
  
  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }
  
  try {
    const breaches = await queryHibpBreaches(email);
    const db = getFirestore();
    
    // Save breach records
    const batch = db.batch();
    breaches.forEach((breach: any) => {
      const breachRef = db.collection('users').doc(userId).collection('breaches').doc();
      batch.set(breachRef, {
        email,
        breachName: breach.Name,
        breachDate: breach.BreachDate,
        dataClasses: breach.DataClasses,
        isVerified: breach.IsVerified,
        isSensitive: breach.IsSensitive,
        discoveredAt: new Date(),
      });
    });
    
    await batch.commit();
    
    // Award XP for finding breaches
    if (breaches.length > 0) {
      await awardHibpXp(userId, breaches.length * 5);
    }
    
    return {
      success: true,
      breachCount: breaches.length,
      breaches,
    };
    
  } catch (error) {
    console.error('HIBP check error:', error);
    throw new functions.https.HttpsError('internal', 'Failed to check breaches');
  }
});

// CF10: Daily domain breach monitoring
export const checkDomainBreaches = functions.pubsub
  .schedule('every day 02:00')
  .timeZone('UTC')
  .onRun(async (context) => {
    const db = getFirestore();
    
    // Get all companies with email domains
    const companiesQuery = await db.collection('companies')
      .where('domain', '!=', null)
      .get();
    
    const promises = companiesQuery.docs.map(async (companyDoc) => {
      const companyData = companyDoc.data();
      const domain = companyData.domain;
      
      if (!domain) return;
      
      try {
        const breaches = await queryHibpDomainBreaches(domain);
        
        // Check for new breaches since last check
        const lastCheckQuery = await db.collection('companies')
          .doc(companyDoc.id)
          .collection('domainBreaches')
          .orderBy('discoveredAt', 'desc')
          .limit(1)
          .get();
        
        const lastCheck = lastCheckQuery.empty ? 
          new Date(0) : 
          lastCheckQuery.docs[0].data().discoveredAt.toDate();
        
        const newBreaches = breaches.filter((breach: any) => 
          new Date(breach.AddedDate) > lastCheck
        );
        
        if (newBreaches.length > 0) {
          // Save new breaches
          const batch = db.batch();
          newBreaches.forEach((breach: any) => {
            const breachRef = db.collection('companies')
              .doc(companyDoc.id)
              .collection('domainBreaches')
              .doc();
            
            batch.set(breachRef, {
              domain,
              breachName: breach.Name,
              breachDate: breach.BreachDate,
              addedDate: breach.AddedDate,
              dataClasses: breach.DataClasses,
              isVerified: breach.IsVerified,
              discoveredAt: new Date(),
            });
          });
          
          await batch.commit();
          
          console.log(`Found ${newBreaches.length} new breaches for domain ${domain}`);
        }
        
      } catch (error) {
        console.error(`Domain breach check error for ${domain}:`, error);
      }
    });
    
    await Promise.all(promises);
  });

// Helper functions
async function queryHibpBreaches(email: string) {
  const HIBP_API_KEY = process.env.HIBP_API_KEY;
  
  const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
    headers: {
      'hibp-api-key': HIBP_API_KEY!,
      'User-Agent': 'SecureHero-Platform',
    },
  });
  
  if (response.status === 404) {
    return []; // No breaches found
  }
  
  if (!response.ok) {
    throw new Error(`HIBP API error: ${response.status}`);
  }
  
  return await response.json();
}

async function queryHibpDomainBreaches(domain: string) {
  const HIBP_API_KEY = process.env.HIBP_API_KEY;
  
  const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${domain}`, {
    headers: {
      'hibp-api-key': HIBP_API_KEY!,
      'User-Agent': 'SecureHero-Platform',
    },
  });
  
  if (response.status === 404) {
    return [];
  }
  
  if (!response.ok) {
    throw new Error(`HIBP API error: ${response.status}`);
  }
  
  return await response.json();
}

async function awardHibpXp(userId: string, xp: number) {
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