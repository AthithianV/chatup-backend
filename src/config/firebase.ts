import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVwpLVdHU6owXp8Z0js2Sbgo7YOHuq5cs",
  authDomain: "chatup-ea25b.firebaseapp.com",
  projectId: "chatup-ea25b",
  storageBucket: "chatup-ea25b.appspot.com",
  messagingSenderId: "712858800477",
  appId: "1:712858800477:web:f59bc43b9a10828eaad8b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);