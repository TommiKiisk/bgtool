// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhl8n_Mawz4btEQuEYF7lKATUprzBEB1w",
  authDomain: "bgtool-2d660.firebaseapp.com",
  databaseURL: "https://bgtool-2d660-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bgtool-2d660",
  storageBucket: "bgtool-2d660.firebasestorage.app",
  messagingSenderId: "512942748610",
  appId: "1:512942748610:web:6546e99a5b16ecdc6b5c5b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
