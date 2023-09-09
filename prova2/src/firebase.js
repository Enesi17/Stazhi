//Created by  : Enes Smajli 
//Date        : 15/09/23
//Last Update : 15/09/23
//Description : Used for configuring firebase and firestore with the react app 

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"
import 'firebase/compat/auth';


const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyAgMzhsz7Z1N_WvubPwJqI_7CM9eYMRmPk",
        authDomain: "dbs-project-c1387.firebaseapp.com",
        projectId: "dbs-project-c1387",
        storageBucket: "dbs-project-c1387.appspot.com",
        messagingSenderId: "389687496434",
        appId: "1:389687496434:web:b84e65fda36e8dff188a6b"
    }
)

const firestore = app.firestore();

export { firestore };
export const auth = app.auth()
export default app

