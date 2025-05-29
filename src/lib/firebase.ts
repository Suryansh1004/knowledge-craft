
// src/lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// IMPORTANT: Ensure this apiKey is the correct "Web API Key" from your Firebase project settings.
// Firebase Console > Project Settings (gear icon) > General tab > Your apps > Web API Key.
// An "invalid API key" error usually means this key is incorrect for the project.
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

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
