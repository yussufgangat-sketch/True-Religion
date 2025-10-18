'use client';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

// Debug: Log raw environment variables
console.log('Raw Firebase Environment Variables:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

// Check if we have valid Firebase configuration
const hasValidConfig = cfg.apiKey && cfg.authDomain && cfg.projectId && 
                       cfg.apiKey !== 'undefined' && cfg.authDomain !== 'undefined' && cfg.projectId !== 'undefined';

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
  // Always initialize Firebase with the hardcoded config
  firebaseApp = getApps().length ? getApp() : initializeApp(cfg);
  firebaseAuth = getAuth(firebaseApp);
  firebaseStorage = getStorage(firebaseApp);
  db = getFirestore(firebaseApp);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { firebaseApp, firebaseAuth, firebaseStorage, db };
