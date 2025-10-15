'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug: Log raw environment variables
console.log('Raw Firebase Environment Variables:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

// Check if we have valid Firebase configuration
const hasValidConfig = cfg.apiKey && cfg.authDomain && cfg.projectId;

// Debug: Log configuration status
console.log('Firebase Config Status:', {
  hasApiKey: !!cfg.apiKey,
  hasAuthDomain: !!cfg.authDomain,
  hasProjectId: !!cfg.projectId,
  hasValidConfig,
  fullConfig: cfg
});

if (!hasValidConfig) {
  console.error('❌ Missing Firebase environment variables. Authentication will not work.');
  console.error('Please check your Vercel environment variables configuration.');
} else {
  console.log('✅ Firebase configuration loaded successfully');
}

// Initialize Firebase (will fail gracefully if config is invalid)
let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseStorage: FirebaseStorage | null = null;
let db: Firestore | null = null;

try {
  if (hasValidConfig) {
    firebaseApp = getApps().length ? getApp() : initializeApp(cfg);
    firebaseAuth = getAuth(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    console.warn('Firebase config invalid, auth will not work');
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { firebaseApp, firebaseAuth, firebaseStorage, db };
