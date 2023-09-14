//Created by  : Enes Smajli 
//Date        : 15/09/23
//Last Update : 15/09/23
//Description : Used for configuring firebase and firestore with the react app 

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import 'firebase/compat/auth';


const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBPNHdhuZtAfAq93_BViqggnkd9nq0HIbY",
        authDomain: "final-ed300.firebaseapp.com",
        projectId: "final-ed300",
        storageBucket: "final-ed300.appspot.com",
        messagingSenderId: "789977778733",
        appId: "1:789977778733:web:1457d3e9adaed0328286a4"
    }
)

const firestore = app.firestore();

export { firestore };
export const auth = app.auth()
export default app

