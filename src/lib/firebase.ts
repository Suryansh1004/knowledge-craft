
// src/lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
// Import getAnalytics and its type, but don't call it yet
import { getAnalytics, Analytics as FirebaseAnalyticsType } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDyXB1fz0vB2mLcgHlxMvib5K5bfSpTzLg",
  authDomain: "knowledge-craft-fftg2.firebaseapp.com",
  projectId: "knowledge-craft-fftg2",
  storageBucket: "knowledge-craft-fftg2.firebasestorage.app",
  messagingSenderId: "291593281248",
  appId: "1:291593281248:web:4d096101a92d2407817a85"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Declare analytics but initialize it conditionally
let analytics: FirebaseAnalyticsType | undefined = undefined;

if (typeof window !== 'undefined') {
  // This block only runs on the client-side
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Firebase Analytics client-side initialization error:", error);
    // Optionally, prevent analytics from being used if initialization fails
    analytics = undefined; 
  }
}

export { app, analytics };
