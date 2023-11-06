// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkiuo-_8lhMOTzk3-qyWXpvYtf8pTyPmA",
  authDomain: "mern-media-6c219.firebaseapp.com",
  projectId: "mern-media-6c219",
  storageBucket: "mern-media-6c219.appspot.com",
  messagingSenderId: "811225029284",
  appId: "1:811225029284:web:6aea44d57f259bce01a431"
};
export default firebaseConfig;
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);