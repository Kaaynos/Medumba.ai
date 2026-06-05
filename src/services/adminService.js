import { collection, getDocs, orderBy, query, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function getAllUsers() {
  const q        = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ uid: d.id, ...d.data() }));
}

export async function isAdmin(uid) {
  if (!uid) return false;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() && snap.data().role === 'admin';
}
