import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import {useRecoilState } from "recoil"
import {userListState} from "../recoil/atoms/userlist"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const colRef = collection(db, "users");




export const users = [];

getDocs(colRef)
  .then((snapshot) => {
    
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    //console.log(users);
  })
  .catch((err) => {
    console.log(err.message);
  });
  console.log(users)

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unsubscribe;
  }, []);

  return currentUser;
}

export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function updateEmail(email) {
  return updateEmail(auth, email);
}

export async function updatePassword(password) {
  return updatePassword(auth, password);
}

/*
export const uploadFiles = async (file, setLoading) => {
  if (!file) return;

  const storageRef = ref(storage,  `${file.name}`)
  setLoading(true)
  const snapshot = await uploadBytes(storageRef, file)
  setLoading(false)

  alert('File Uploaded!')
}
*/

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid, +".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);

  alert("uploaded file");
}

export default app;
