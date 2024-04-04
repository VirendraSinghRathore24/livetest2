import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDIy9E9nrDnejpliU_aHs01zUiQ4hgd-20",
    authDomain: "livetest-8b883.firebaseapp.com",
    databaseURL: "https://livetest-8b883-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "livetest-8b883",
    storageBucket: "livetest-8b883.appspot.com",
    messagingSenderId: "429107544762",
    appId: "1:429107544762:web:3ab0fb2cb79b9f5eef7883",
    measurementId: "G-B7BCZKQHEH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imageDb = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
