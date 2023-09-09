
//Created by  : Enes Smajli 
//Date        : 05/09/23
//Last Update : 14/09/23
//Description : About component, short introduction

import React from 'react';
import { Alert, Button } from 'react-bootstrap'
import "../index.css"
import { useAuth } from '../context/AuthContext';
// import Dashboard from './Dashboard';


const About = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="container mt-5">
        <div className="about">
          <h2 className="display-4">T3-stazherat</h2>
          <hr className="my-4" />
          <div className="row">
            
            <div>
              <h4>First Module</h4>
              { !currentUser && <Button href="/login" className="custom-button">Log in</Button>}
              { currentUser && <br />}
              <p>
                This is the first module, a product of the realization of 'Task 1' given on 09/04/2023. Required functionalities:
              </p>
              <ul>
                <li>Sign up</li>
                <li>Log in</li>
                <li>Database (Firestore)</li>
                <li>Authentication (Firebase)</li>
                <li>Table view</li>
                <li>Edit records/data</li>
                <li>Add records/data</li>
                <li>Remove/delete records/data</li>
              </ul>

              <p>
                This task was given to the team of interns: Enes Smajli, Uveis Smajli. Product description: The idea is for the user to be able to register in the program, to be able to log in, to be able to see the data tables. The user can also edit, delete, or add new data to the application.
              </p>

              <p>
                The application to register users (authentication) uses the services of Firebase, (<a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase</a>). While as a database, temporarily, it uses Firestore, a product of Firebase.
              </p>

              <p>
                In addition to those that have been requested, we have also added the possibility of resetting the password in case the user has forgotten it, but for this to happen, be careful! An active email must be used during registration! This is because the new password is sent to that email, which you write in the input corresponding to that part of the program.
              </p>

              <p>
                For styling, we used the Bootstrap library, as requested.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;