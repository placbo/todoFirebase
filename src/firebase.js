import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBlc-9cBQVLLXdLxYfVpgh8I3iFALoQ7E0",
    authDomain: "todo-2ac34.firebaseapp.com",
    databaseURL: "https://todo-2ac34.firebaseio.com",
    projectId: "todo-2ac34",
    storageBucket: "todo-2ac34.appspot.com",
    messagingSenderId: "144767486267",
    appId: "1:144767486267:web:53c6a77d36c83e42db4f1e",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
