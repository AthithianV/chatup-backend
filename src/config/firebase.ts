// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDGPUCTzXedriPtowNxWZ-M7hRebaab8g",
  authDomain: "chatup-f0db1.firebaseapp.com",
  projectId: "chatup-f0db1",
  storageBucket: "chatup-f0db1.appspot.com",
  messagingSenderId: "919022859554",
  appId: "1:919022859554:web:3f512c9bd1e0d0239b617b",
  measurementId: "G-TVQJWK8W1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);