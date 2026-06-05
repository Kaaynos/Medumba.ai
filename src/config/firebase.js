import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyDWMSJLyrW9-sRGA9ou6KDkZVAfIykj1zg",
  authDomain:        "medumba-ia.firebaseapp.com",
  projectId:         "medumba-ia",
  storageBucket:     "medumba-ia.firebasestorage.app",
  messagingSenderId: "363865771897",
  appId:             "1:363865771897:android:998b8faf29b26944a5e9a8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
