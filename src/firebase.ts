import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrKNgwbOBuCx-oSxB4GIWK5uYCVW3bRXI",
  authDomain: "discord-clone-udemy-15b22.firebaseapp.com",
  projectId: "discord-clone-udemy-15b22",
  storageBucket: "discord-clone-udemy-15b22.appspot.com",
  messagingSenderId: "67465945326",
  appId: "1:67465945326:web:c3db6f35324ffddecf93ff",
  measurementId: "G-F0RY2ZY15B",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
