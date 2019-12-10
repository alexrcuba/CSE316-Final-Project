import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyCd7rXayjvL8r64PG3COvkxSPr7Rt5XF9E",
    authDomain: "cse316-final-project-5c723.firebaseapp.com",
    databaseURL: "https://cse316-final-project-5c723.firebaseio.com",
    projectId: "cse316-final-project-5c723",
    storageBucket: "cse316-final-project-5c723.appspot.com",
    messagingSenderId: "628031138947",
    appId: "1:628031138947:web:5a1951a21c3bd65338ffb6",
    measurementId: "G-3MJMK2NV7F"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;