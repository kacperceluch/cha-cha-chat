import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVRw7--1B6RvllmKEcRIYxrNP4j0_44-E",
    authDomain: "chat-e676f.firebaseapp.com",
    projectId: "chat-e676f",
    storageBucket: "chat-e676f.appspot.com",
    messagingSenderId: "1009736129497",
    appId: "1:1009736129497:web:10e03758220736e1cc57c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()