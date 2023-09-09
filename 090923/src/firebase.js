//Created by  : Enes Smajli 
//Date        : 15/09/23
//Last Update : 15/09/23
//Description : Used for configuring firebase and firestore with the react app 

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import 'firebase/compat/auth';


const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyBERIBGOSupgqJsvZDtdGY1Ywxsujbx3n8",
        authDomain: "db2-test-ae849.firebaseapp.com",
        projectId: "db2-test-ae849",
        storageBucket: "db2-test-ae849.appspot.com",
        messagingSenderId: "441942118154",
        appId: "1:441942118154:web:449ed98e8dcde55eb8f4f3"
    }
)

const firestore = app.firestore();

export { firestore };
export const auth = app.auth()
export default app

