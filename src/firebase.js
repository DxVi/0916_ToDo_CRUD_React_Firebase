import firebase from "firebase";

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdupmHf19DQE2aLwZbbnwdIxEt6nnvK9M",
    authDomain: "todo-6c3d7.firebaseapp.com",
    databaseURL: "https://todo-6c3d7.firebaseio.com",
    projectId: "todo-6c3d7",
    storageBucket: "todo-6c3d7.appspot.com",
    messagingSenderId: "247438030302",
    appId: "1:247438030302:web:808869dc88517db75e594f",
    measurementId: "G-ZS5297061E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig )

const db = firebaseApp.firestore();

export default db;

 