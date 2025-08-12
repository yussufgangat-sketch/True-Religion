'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Optional: helpful warning to avoid silent build fails
if (!cfg.apiKey) {
  // This only runs in the browser because of 'use client'
  console.warn('Missing Firebase env vars. Check Vercel project settings.');
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(cfg);
export const firebaseAuth = getAuth(firebaseApp);
