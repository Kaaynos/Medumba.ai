import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Remplacer ces valeurs par celles de votre projet Firebase
// (Settings > General > Your apps > SDK setup and configuration)
const firebaseConfig = {
  apiKey:            "AIzaSyDWMSJLyrW9-sRGA9ou6KDkZVAfIykj1zg",
  authDomain:        "medumba-ia.firebaseapp.com",
  projectId:         "medumba-ia",
  storageBucket:     "medumba-ia.firebasestorage.app",
  messagingSenderId: "363865771897",
  appId:             "1:363865771897:android:998b8faf29b26944a5e9a8",
};

const app  = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
