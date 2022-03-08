// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6SRgq8_Pr8c5F46g2xLPOi22Q-Ewl628',
  authDomain: 'instagram-57184.firebaseapp.com',
  projectId: 'instagram-57184',
  storageBucket: 'instagram-57184.appspot.com',
  messagingSenderId: '959087901980',
  appId: '1:959087901980:web:aaeda6405f883417584ed9',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
