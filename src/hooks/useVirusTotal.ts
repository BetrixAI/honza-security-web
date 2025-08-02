/**
 * VirusTotal scanning hooks with Firestore integration
 * Owner: Kubca - VT scanner functionality
 */

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  collection, 
  doc, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import type { VTScanResult, VTScanStatus } from '@/types'

const MAX_FILE_SIZE = 32 * 1024 * 1024 // 32MB
const CLEANUP_THRESHOLD_HOURS = 24

interface ScanFile {
  file: File
  scanId?: string
  uploadProgress: number
  error?: string
}

// Hook for managing VT scans
export function useVirusTotal() {
  const { user } = useAuth()
  const [scans, setScans] = useState<VTScanResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scanFiles, setScanFiles] = useState<ScanFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Listen to user's scans
  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    const scansQuery = query(
      collection(db, 'virusTotalScans'),
      where('uid', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(scansQuery, (snapshot) => {
      const userScans = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VTScanResult[]
      
      setScans(userScans)
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to VT scans:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.uid])

  // Validate files before upload
  const validateFiles = (files: File[]): { valid: File[], errors: string[] } => {
    const valid: File[] = []
    const errors: string[] = []

    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`Soubor ${file.name} je příliš velký (max 32MB)`)
        return
      }
      
      // Sanitize filename
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      if (sanitizedName !== file.name) {
        // Create new file with sanitized name
        const sanitizedFile = new File([file], sanitizedName, { type: file.type })
        valid.push(sanitizedFile)
      } else {
        valid.push(file)
      }
    })

    return { valid, errors }
  }

  // Upload files for scanning
  const uploadFiles = async (files: File[]): Promise<void> => {
    if (!user?.uid) {
      throw new Error('User not authenticated')
    }

    const { valid: validFiles, errors } = validateFiles(files)
    
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    if (validFiles.length === 0) return

    setIsUploading(true)
    
    try {
      // Add files to scan list
      const newScanFiles: ScanFile[] = validFiles.map(file => ({
        file,
        uploadProgress: 0
      }))
      
      setScanFiles(prev => [...prev, ...newScanFiles])

      // Process each file
      for (const scanFile of newScanFiles) {
        try {
          // Create Firestore entry first
          const scanDoc = await addDoc(collection(db, 'virusTotalScans'), {
            uid: user.uid,
            fileName: scanFile.file.name,
            status: 'queued' as VTScanStatus,
            createdAt: Timestamp.now()
          })

          // Update scan file with ID
          setScanFiles(prev => prev.map(sf => 
            sf.file === scanFile.file ? { ...sf, scanId: scanDoc.id } : sf
          ))

          // Simulate upload progress
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise(resolve => setTimeout(resolve, 200))
            setScanFiles(prev => prev.map(sf => 
              sf.file === scanFile.file ? { ...sf, uploadProgress: progress } : sf
            ))
          }

          // TODO: Replace with actual Cloud Function call
          // const formData = new FormData()
          // formData.append('file', scanFile.file)
          // formData.append('scanId', scanDoc.id)
          // 
          // const response = await fetch('/api/vt-upload', {
          //   method: 'POST',
          //   body: formData,
          //   headers: {
          //     'Authorization': `Bearer ${await user.getIdToken()}`
          //   }
          // })
          //
          // if (!response.ok) {
          //   throw new Error(`Upload failed: ${response.statusText}`)
          // }

          // Mock successful upload for demo
          await new Promise(resolve => setTimeout(resolve, 1000))

        } catch (error) {
          console.error('Upload error for file:', scanFile.file.name, error)
          setScanFiles(prev => prev.map(sf => 
            sf.file === scanFile.file ? { 
              ...sf, 
              error: error instanceof Error ? error.message : 'Upload failed' 
            } : sf
          ))
        }
      }

    } finally {
      setIsUploading(false)
      // Clear scan files after processing
      setTimeout(() => setScanFiles([]), 3000)
    }
  }

  // Remove scan file from UI
  const removeScanFile = (file: File) => {
    setScanFiles(prev => prev.filter(sf => sf.file !== file))
  }

  // Get recent scans
  const getRecentScans = (limit_param = 10) => {
    return scans.slice(0, limit_param)
  }

  // Get scans by status
  const getScansByStatus = (status: VTScanStatus) => {
    return scans.filter(scan => scan.status === status)
  }

  return {
    scans,
    scanFiles,
    isLoading,
    isUploading,
    uploadFiles,
    removeScanFile,
    getRecentScans,
    getScansByStatus,
    validateFiles
  }
}

// Hook for VT scan statistics
export function useVTStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalScans: 0,
    maliciousFound: 0,
    cleanFiles: 0,
    xpEarned: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    const scansQuery = query(
      collection(db, 'virusTotalScans'),
      where('uid', '==', user.uid)
    )

    const unsubscribe = onSnapshot(scansQuery, (snapshot) => {
      let totalScans = 0
      let maliciousFound = 0
      let cleanFiles = 0
      let xpEarned = 0

      snapshot.docs.forEach(doc => {
        const scan = doc.data() as VTScanResult
        if (scan.status === 'done') {
          totalScans++
          if (scan.verdict === 'malicious') {
            maliciousFound++
          } else if (scan.verdict === 'clean') {
            cleanFiles++
          }
          xpEarned += scan.xpAwarded || 0
        }
      })

      setStats({
        totalScans,
        maliciousFound,
        cleanFiles,
        xpEarned
      })
      setIsLoading(false)
    }, (error) => {
      console.error('Error listening to VT stats:', error)
      setIsLoading(false)
    })

    return unsubscribe
  }, [user?.uid])

  return {
    stats,
    isLoading
  }
}

// Utility functions for VT results
export const vtUtils = {
  getVerdictColor: (verdict?: string) => {
    switch (verdict) {
      case 'clean':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'malicious':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'suspicious':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  },

  getVerdictText: (verdict?: string, locale: string = 'cs') => {
    const texts = {
      cs: {
        clean: 'Čistý',
        malicious: 'Škodlivý',
        suspicious: 'Podezřelý',
        scanning: 'Skenování...'
      },
      en: {
        clean: 'Clean',
        malicious: 'Malicious', 
        suspicious: 'Suspicious',
        scanning: 'Scanning...'
      }
    }
    
    return texts[locale as keyof typeof texts]?.[verdict as keyof typeof texts.cs] || 'Unknown'
  },

  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }
}