import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase utilisé uniquement pour le Storage audio (migration Supabase complète pour auth/db)
const firebaseConfig = {
  apiKey:            "AIzaSyDWMSJLyrW9-sRGA9ou6KDkZVAfIykj1zg",
  storageBucket:     "medumba-ia.firebasestorage.app",
  appId:             "1:363865771897:android:998b8faf29b26944a5e9a8",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
