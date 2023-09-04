// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHpRHNW4I5lCbViei6RnJ-VWR5EKLoT5g",
    authDomain: "crwn-clothing-db-275e8.firebaseapp.com",
    projectId: "crwn-clothing-db-275e8",
    storageBucket: "crwn-clothing-db-275e8.appspot.com",
    messagingSenderId: "183045808798",
    appId: "1:183045808798:web:8c2c28f31462b53e05d18f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createAt });
        } catch (err) {
            console.log("error creating the user", err.message);
        }
    }
    return userDocRef;
};
