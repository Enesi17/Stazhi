import React from 'react'
import {Button, Card, Form} from 'react-bootstrap'
const Login = () => {
  return (
    <div>
        <Card>
            <Card.Header>
                <h2>LOG IN</h2>
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
                        <Form.Check type='checkbox' defaultChecked/> Remember Me
                    </Form.Group>
                    <Form.Group>
                        <p>Did you <a href="">forget your password</a>?</p>
                        <p>No account? <a href="/signup">Sign Up</a></p>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='button'>Log In</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default Login;