// src/lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcRWQmLbZDNA11cD1fBYye1kAV2cPaCoA",
  authDomain: "knowledge-craft-f1ce2.firebaseapp.com",
  projectId: "knowledge-craft-f1ce2",
  storageBucket: "knowledge-craft-f1ce2.appspot.com", // Corrected storageBucket to .appspot.com as per standard
  messagingSenderId: "867074024145",
  appId: "1:867074024145:web:8a47d4e39394a49bb7dbf0",
  measurementId: "G-9N32HTVS0W"
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
