import firebase from "firebase/app";
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB4UovhcaVM6pLlKn0F9GwN9yeq6N0shJM",
    authDomain: "collectio-auth.firebaseapp.com",
    projectId: "collectio-auth",
    storageBucket: "collectio-auth.appspot.com",
    messagingSenderId: "845062203591",
    appId: "1:845062203591:web:bf923a37a083d00294b6e2",
    measurementId: "G-DSZW7N2W9J"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;