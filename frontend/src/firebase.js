import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAn9zgwu-9ktFcfS68RwN5uxhmagWdsgy8",
    authDomain: "digital-easy-ecommerce.firebaseapp.com",
    projectId: "digital-easy-ecommerce",
    storageBucket: "digital-easy-ecommerce.appspot.com",
    messagingSenderId: "412591627488",
    appId: "1:412591627488:web:60513e53b449f440aa0485"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth }


//test