//Created by  : Enes Smajli 
//Date        : 05/09/23
//Last Update : 14/09/23
//Description : Login component used to log in

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const Login = () => {

    let  tell = true;
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("");
          setLoading(true);
          await login(emailRef.current.value, passwordRef.current.value);
          window.location.pathname="/";
        } catch {
          setError("Failed to log in")
        }
    
        setLoading(false)
    }

    function trueLogin() {
        if(!tell){ window.location.pathname="/dashboard"}
    }

  return (
    <div className="login">
        <Card>
            <Card.Header>
                <h2>LOG IN</h2>
            </Card.Header>
            <Card.Body>
                {error&&<Alert className='info' variant="danger">{error}</Alert>}
                {!error&&<Alert className='info' variant="info">Welcom to our Login page</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='form-input-container'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} placeholder='Enter email' required/>
                    </Form.Group>
                    <Form.Group className='form-input-container'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder='Enter password' required/>
                    </Form.Group>
                    <Form.Group>
                        <p>Did you<a href="/forgotPassword">forget your password?</a></p>
                        <p>No account?<a href="/signup">Sign Up</a></p>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='button'>Log In</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
            {/* <button type='submit' className='button'><img className='button-img' src="./211686_back_arrow_icon.png" alt="back arrow" /> Home</button> */}
        </Card>
        
    </div>
  )
}

export default Login;