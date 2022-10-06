import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAcbgZWnWCoO8CzPoEWtdrjzJasFdmtEMQ",
    authDomain: "olx-clone-51b19.firebaseapp.com",
    projectId: "olx-clone-51b19",
    storageBucket: "olx-clone-51b19.appspot.com",
    messagingSenderId: "314074501643",
    appId: "1:314074501643:web:1ad54d501277d3adefed0e",
    measurementId: "G-NTTQPNEQKP"
  };

export default firebase.initializeApp(firebaseConfig)