// firebase/client.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBMp0eQpL2f6oW2dWzC4KldMuXs8Ku5RgY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prime-achadinhos.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://prime-achadinhos-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prime-achadinhos",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prime-achadinhos.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "139569093020",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:139569093020:web:5a0af02f858cac6ae209f1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8Z28EEPHPY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Adicionado para controle de acesso admin

export { app, database, auth };
