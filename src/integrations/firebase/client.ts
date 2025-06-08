// firebase/client.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMp0eQpL2f6oW2dWzC4KldMuXs8Ku5RgY",
  authDomain: "prime-achadinhos.firebaseapp.com",
  databaseURL: "https://prime-achadinhos-default-rtdb.firebaseio.com",
  projectId: "prime-achadinhos",
  storageBucket: "prime-achadinhos.appspot.com",
  messagingSenderId: "139569093020",
  appId: "1:139569093020:web:5a0af02f858cac6ae209f1",
  measurementId: "G-8Z28EEPHPY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Adicionado para controle de acesso admin

export { app, database, auth };
