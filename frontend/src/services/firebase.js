// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyATW5Zem56SmQz5ydwK5R0v3OIk3iGiY7g",
  authDomain: "test-system-648c7.firebaseapp.com",
  projectId: "test-system-648c7",
  storageBucket: "test-system-648c7.firebasestorage.app",
  messagingSenderId: "769254652775",
  appId: "1:769254652775:web:082904d232f9e323368dc2",
  measurementId: "G-GK0PN641LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();