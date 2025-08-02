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
let auth: Auth
let firestore: Firestore
let storage: FirebaseStorage

const initializeFirebase = () => {
  // Kontrola zda je Firebase již inicializován
  if (getApps().length === 0) {
    // Validace konfigurace
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('Firebase configuration is missing required fields')
    }
    
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  
  // Inicializace služeb pouze pokud ještě nejsou inicializované
  if (!auth) {
    auth = getAuth(app)
  }
  
  if (!firestore) {
    firestore = getFirestore(app)
  }
  
  if (!storage) {
    storage = getStorage(app)
  }
  
  return { app, auth, firestore, storage }
}

// Lazy gettery pro Firebase služby
export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    initializeFirebase()
  }
  return app
}

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    initializeFirebase()
  }
  return auth
}

export const getFirebaseFirestore = (): Firestore => {
  if (!firestore) {
    initializeFirebase()
  }
  return firestore
}

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    initializeFirebase()
  }
  return storage
}

// Default export pro kompatibilitu
export default getFirebaseApp