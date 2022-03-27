import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBPqVHfl8iXPd3K1_SfnTvWoSeBFLvmrb8",
    authDomain: "thamrintech-dfb7f.firebaseapp.com",
    projectId: "thamrintech-dfb7f",
    storageBucket: "thamrintech-dfb7f.appspot.com",
    messagingSenderId: "455507106410",
    appId: "1:455507106410:web:138881813dfabbd85f8813",
    measurementId: "G-FKQN5Y0CBJ",
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };