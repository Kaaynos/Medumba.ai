import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Inscription
export async function registerUser({ name, email, password, age, language, reason, dailyGoal }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // Sauvegarder le profil dans Firestore
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    age:       age      || null,
    language:  language || 'french',
    reason:    reason   || null,
    dailyGoal: dailyGoal|| 10,
    xp:        0,
    streak:    0,
    gems:      50,
    hearts:    5,
    level:     'A1',
    completedLessons: [],
    createdAt: serverTimestamp(),
    lastSeen:  serverTimestamp(),
  });

  return user;
}

// Connexion
export async function loginUser(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

// Déconnexion
export async function logoutUser() {
  await signOut(auth);
}

// Réinitialisation mot de passe
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// Récupérer profil Firestore
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// Écouter l'état de connexion
export function listenAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
