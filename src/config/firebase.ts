import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Official BhadeKaar Firebase Configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCjsdjvGsBFmfdwiwbDPND_L-De3nDyw_A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bhadekaar.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bhadekaar",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bhadekaar.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "823356272015",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:823356272015:web:aee3df85cd7e3fb5eaeffa",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KBSZ8W3K4V"
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally (only supported in browser environments)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics not supported in this environment
  });
}
