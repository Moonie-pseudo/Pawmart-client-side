import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHAyZ2yt3xvY_HTC1-5KL8ACQ6pM_TJ90",
  authDomain: "pawmart-42105.firebaseapp.com",
  projectId: "pawmart-42105",
  storageBucket: "pawmart-42105.firebasestorage.app",
  messagingSenderId: "993738892424",
  appId: "1:993738892424:web:23a6008d44c6f2e697eb3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);