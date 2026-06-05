import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export async function registerUser({ name, email, password, age, language, reason, dailyGoal }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    age:              age       || null,
    language:         language  || 'french',
    reason:           reason    || null,
    dailyGoal:        dailyGoal || 10,
    xp:               0,
    streak:           0,
    gems:             50,
    hearts:           5,
    level:            'A1',
    completedLessons: [],
    createdAt:        serverTimestamp(),
    lastSeen:         serverTimestamp(),
  });
  return user;
}

export async function loginUser(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result   = await signInWithPopup(auth, provider);
  const user     = result.user;

  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      name:             user.displayName || '',
      email:            user.email       || '',
      age:              null,
      language:         'french',
      reason:           null,
      dailyGoal:        10,
      xp:               0,
      streak:           0,
      gems:             50,
      hearts:           5,
      level:            'A1',
      completedLessons: [],
      createdAt:        serverTimestamp(),
      lastSeen:         serverTimestamp(),
    });
  }
  return user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export function listenAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
