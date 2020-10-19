import firebase from "firebase";
const firebaseConfig =  firebase.initializeApp({
    apiKey: "AIzaSyAcpF8CPocbOJR-uSdb-xa1T4nBtZsqWtA",
    authDomain: "avone-1c38e.firebaseapp.com",
    databaseURL: "https://avone-1c38e.firebaseio.com",
    projectId: "avone-1c38e",
    storageBucket: "avone-1c38e.appspot.com",
    messagingSenderId: "95102752003",
    appId: "1:95102752003:web:a5250f90cdeda8e472c536",
    measurementId: "G-PVLYJ3MW3E"
})
const auth = firebase.auth();
const db = firebaseConfig.firestore();
const storage = firebase.storage();


export { auth, db, storage };