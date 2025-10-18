import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

// Only initialize Firebase if we have valid config values and we're in the browser
const shouldInitializeFirebase = () => {
  return typeof window !== 'undefined' && 
         firebaseConfig.apiKey && 
         firebaseConfig.authDomain &&
         firebaseConfig.projectId;
};

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (shouldInitializeFirebase()) {
  try {
    firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { firebaseApp, firebaseAuth, db, storage };


