import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://colours-bahrain-default-rtdb.firebaseio.com/",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let realtimeDb;
let auth;

try {
    // Check if firebase app is already initialized to avoid double-init in dev mode
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    
    realtimeDb = getDatabase(app);
    auth = getAuth(app);
    
} catch (e) {
    console.warn("Firebase initialization failed:", e);
}

export { realtimeDb, auth };