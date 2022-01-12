import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import 'firebase/compat/auth'

const firebaseCfg = {
    apiKey: "AIzaSyDbFp9t_xdmL3uql170OO4ggjdvJekgkpQ",
    authDomain: "netflix-clone-9b636.firebaseapp.com",
    projectId: "netflix-clone-9b636",
    storageBucket: "netflix-clone-9b636.appspot.com",
    messagingSenderId: "133954224287",
    appId: "1:133954224287:web:41ce25ebbbc8aadddee2aa"
  };

const firebaseApp = firebase.initializeApp(firebaseCfg)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth }
export default db
