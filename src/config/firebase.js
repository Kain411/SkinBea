// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd34ev_AgDQSt2Y8FAmEzTcSHN6wxiEBg",
  authDomain: "data-90f02.firebaseapp.com",
  databaseURL: "https://data-90f02-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-90f02",
  storageBucket: "data-90f02.appspot.com",
  messagingSenderId: "490514716278",
  appId: "1:490514716278:web:9bdee9ea472fa6b27e3157",
  measurementId: "G-CD7D2ZEFQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();