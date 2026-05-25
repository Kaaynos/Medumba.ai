import { doc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

// Mettre à jour XP après une leçon
export async function addXP(uid, xpEarned) {
  await updateDoc(doc(db, 'users', uid), {
    xp:       increment(xpEarned),
    lastSeen: serverTimestamp(),
  });
}

// Marquer une leçon comme complétée
export async function completeLesson(uid, lessonId, xpEarned) {
  await updateDoc(doc(db, 'users', uid), {
    completedLessons: arrayUnion(lessonId),
    xp:               increment(xpEarned),
    lastSeen:         serverTimestamp(),
  });
}

// Mettre à jour le streak
export async function updateStreak(uid, newStreak) {
  await updateDoc(doc(db, 'users', uid), {
    streak:   newStreak,
    lastSeen: serverTimestamp(),
  });
}

// Mettre à jour le profil
export async function updateProfile(uid, data) {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    lastSeen: serverTimestamp(),
  });
}
