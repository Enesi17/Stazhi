//Created by  : Enes Smajli 
//Date        : 11/09/23
//Last Update : 11/09/23
//Description : Used for configuring firebase and firestore with the react app 

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import 'firebase/compat/auth';


const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyAKCLiNUvDD8X5j7pLbz8CH5l_Why9lAtI",
        authDomain: "clients-89cef.firebaseapp.com",
        projectId: "clients-89cef",
        storageBucket: "clients-89cef.appspot.com",
        messagingSenderId: "1036333204290",
        appId: "1:1036333204290:web:75fe198535c278ea16fedb"
    }
)

const firestore = app.firestore();

export {firestore};
export const auth = app.auth()
export default app

