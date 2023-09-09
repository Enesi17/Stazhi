//Created by  : Enes Smajli 
//Date        : 05/09/23
//Last Update : 14/09/23
//Description : Singup.js is an component, it registers the new users saves them in firestore

import React from 'react'
import "../index.css"
import { useRef, useState } from 'react'
import {Alert, Button, Card, Form} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firestore } from '../firebase';

const Signup = () => {

    const firestoreData = firebase.firestore();
    let emailRef = useRef();
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();
    let firstName = useRef();
    let lastName = useRef();

    const [signupSuccess, setSignupSuccess] = useState(false);
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [addFormData, setAddFormData] = useState({
        email:"",
        password:"",
        firstName:"",
        lastName:""
      });
    
      async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          return setError("Passwords do not match")
        }
        
        
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value);
          
          const newClient = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            };

          try {
            await firestore.collection('users').add(newClient);
            setAddFormData({
              email: '',
              password: '',
              firstName: '',
              lastName: '',
            });
          } catch (error) {
            console.error('Error adding client to Firestore: ', error);
          }

          setSignupSuccess(true);
        } catch {
            setError("Failed to create an account")
          }
        
        setLoading(false)
    }
  
    
  
    
  return (
    <div>
        <Card>
            <Card.Header>
                 <h2>Sign Up</h2>
            </Card.Header>
            <Card.Body>
                {error && <Alert className='info' variant='danger'>{error}</Alert>}
                {!error&&<Alert className='info' variant="info">Welcom to our Login page</Alert>}
                {signupSuccess && <Alert className='info' variant='success'>Signed up successfully</Alert>}
                {signupSuccess && setTimeout(function () {window.location.pathname = '/';}, 10000)}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='form-input-container'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required placeholder='Enter email'/>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required placeholder='Enter password'/>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <Form.Label>Confimr Password</Form.Label>
                        <Form.Control type='password' ref={confirmPasswordRef} required placeholder='Confirm password'/>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' ref={firstName} required placeholder='Enter first name'/>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' ref={lastName} required placeholder='Enter last name'/>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <p>Did you<a href="">forget your password?</a></p>
                        <p>Already have an acconut?<a href="/login">Log in</a></p>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <Button disabled={loading} type='submit' className='button'>Sign Up</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Signup;