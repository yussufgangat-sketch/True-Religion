import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "placeholder",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "placeholder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "placeholder",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "placeholder",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "placeholder",
};

// Only initialize Firebase if we have valid config values and we're in the browser
const shouldInitializeFirebase = () => {
  return typeof window !== 'undefined' && 
         firebaseConfig.apiKey !== "placeholder" && 
         firebaseConfig.authDomain !== "placeholder" &&
         firebaseConfig.projectId !== "placeholder";
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


