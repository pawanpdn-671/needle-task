// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA_JL6kKIGikQC0vpJibpvSq-UUWCFRQQM",
	authDomain: "needle-assignment-234ec.firebaseapp.com",
	projectId: "needle-assignment-234ec",
	storageBucket: "needle-assignment-234ec.appspot.com",
	messagingSenderId: "978616433341",
	appId: "1:978616433341:web:ea6a2119ef758815ab55d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
