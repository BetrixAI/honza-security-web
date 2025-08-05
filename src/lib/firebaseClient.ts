import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

// Firebase Client Configuration z environment proměnných
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Lazy initialization Firebase App
let app: FirebaseApp
let authInstance: Auth
let firestoreInstance: Firestore
let storageInstance: FirebaseStorage

const initializeFirebase = () => {
  // Kontrola zda je Firebase již inicializován
  if (getApps().length === 0) {
    // Validace konfigurace
    console.log('🔧 Firebase config:', {
      apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
      projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
      authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing'
    })
    
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('Firebase configuration is missing required fields')
    }
    
    app = initializeApp(firebaseConfig)
    console.log('✅ Firebase initialized successfully')
  } else {
    app = getApps()[0]
    console.log('✅ Using existing Firebase app')
  }
  
  // Inicializace služeb pouze pokud ještě nejsou inicializované
  if (!authInstance) {
    authInstance = getAuth(app)
  }
  
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(app)
  }
  
  if (!storageInstance) {
    storageInstance = getStorage(app)
  }
  
  return { app, auth: authInstance, firestore: firestoreInstance, storage: storageInstance }
}

// Lazy gettery pro Firebase služby
export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    initializeFirebase()
  }
  return app
}

export const getFirebaseAuth = (): Auth => {
  if (!authInstance) {
    initializeFirebase()
  }
  return authInstance
}

export const getFirebaseFirestore = (): Firestore => {
  if (!firestoreInstance) {
    initializeFirebase()
  }
  return firestoreInstance
}

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storageInstance) {
    initializeFirebase()
  }
  return storageInstance
}

// Export zkratek pro jednodušší použití
export const auth = getFirebaseAuth
export const db = getFirebaseFirestore
export const storage = getFirebaseStorage

// Default export pro kompatibilitu
export default getFirebaseApp