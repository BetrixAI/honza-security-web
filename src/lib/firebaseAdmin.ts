import { initializeApp, getApps, cert, App as AdminApp } from 'firebase-admin/app'
import { getAuth, Auth as AdminAuth } from 'firebase-admin/auth'
import { getFirestore, Firestore as AdminFirestore } from 'firebase-admin/firestore'

// Firebase Admin SDK Configuration
let adminApp: AdminApp
let adminAuth: AdminAuth
let adminFirestore: AdminFirestore

const initializeFirebaseAdmin = () => {
  // Kontrola zda je Firebase Admin již inicializován
  if (getApps().length === 0) {
    try {
      // Načtení service account z Base64 encoded environment proměnné
      const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64
      
      if (!serviceAccountBase64) {
        throw new Error('FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64 environment variable is not set')
      }

      // Dekódování Base64 a parsování JSON
      const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8')
      const serviceAccount = JSON.parse(serviceAccountJson)
      
      // Validace service account objektu
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Invalid service account configuration')
      }

      // Inicializace Firebase Admin App s certifikátem
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id
      })
      
      console.log('Firebase Admin SDK successfully initialized')
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error)
      throw new Error(`Firebase Admin initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  } else {
    adminApp = getApps()[0]
  }
  
  // Inicializace služeb pouze pokud ještě nejsou inicializované
  if (!adminAuth) {
    adminAuth = getAuth(adminApp)
  }
  
  if (!adminFirestore) {
    adminFirestore = getFirestore(adminApp)
  }
  
  return { adminApp, adminAuth, adminFirestore }
}

// Lazy gettery pro Firebase Admin služby
export const getFirebaseAdminApp = (): AdminApp => {
  if (!adminApp) {
    initializeFirebaseAdmin()
  }
  return adminApp
}

export const getFirebaseAdminAuth = (): AdminAuth => {
  if (!adminAuth) {
    initializeFirebaseAdmin()
  }
  return adminAuth
}

export const getFirebaseAdminFirestore = (): AdminFirestore => {
  if (!adminFirestore) {
    initializeFirebaseAdmin()
  }
  return adminFirestore
}

// Pomocná funkce pro ověření zda běžíme na serveru
export const isServer = () => typeof window === 'undefined'

// Funkce pro bezpečné použití Admin SDK (pouze na serveru)
export const getAdminAuthSafely = (): AdminAuth | null => {
  if (!isServer()) {
    console.warn('Firebase Admin SDK should only be used on server side')
    return null
  }
  
  try {
    return getFirebaseAdminAuth()
  } catch (error) {
    console.error('Failed to get Firebase Admin Auth:', error)
    return null
  }
}

// Default export pro kompatibilitu
export default getFirebaseAdminApp