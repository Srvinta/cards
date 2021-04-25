import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACAuwRXe4YIhMQIKRRrQVz_hhgPYmkcPM",
    authDomain: "belogpost.firebaseapp.com",
    projectId: "belogpost",
    storageBucket: "belogpost.appspot.com",
    messagingSenderId: "936158473009",
    appId: "1:936158473009:web:651ee5b950bb00f28a5e10",
    measurementId: "G-JV9Z16NYS3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };