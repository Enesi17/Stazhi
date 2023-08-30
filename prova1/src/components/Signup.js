//Created by  : Enes Smajli 
//Date        : 05/09/23
//Description : Sign up component, rensponsible for registring into databse new users 

import React from 'react'
import {Button, Card, Form} from 'react-bootstrap'
const Signup = () => {
  return (
    <div>
        <Card>
            <Card.Header>
                <h2>Sign Up</h2>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Enter email'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter first name'/>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter last name'/>
                    </Form.Group>
                    <Form.Group>
                        <p>Did you <a href="">forget your password</a>?</p>
                        <p>Already have an acconut? <a href="/login">Log in</a></p>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='button'>Sign Up</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Signup;
