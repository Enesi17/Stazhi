//Created by  : Enes Smajli 
//Date        : 08/09/23
//Last Update : 11/09/23
//Description : This component makes it able to reset password in case user forgot it

import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const ForgotPassword = () => {
    
    const { resetPassword } = useAuth();
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setMessage("");
          setError("");
          setLoading(true);
          await resetPassword(emailRef.current.value);
          setMessage("check your inbox for further info");
        } catch {
          setError("Failed to reset password")
        }
        
        setLoading(false)
    }

  return (
    <div className="login">
        <Card>
            <Card.Header>
                <h2>RESET PASSWORD</h2>
            </Card.Header>
            <Card.Body>
                {error&&<Alert className='info' variant="danger">{error}</Alert>}
                {!error&&<Alert className='info' variant="info">Welcom to our Reset password page</Alert>}
                {message&& <Alert className="info" variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} placeholder='Enter email' required/>
                    </Form.Group>
                    <Form.Group>
                        <p>Already have an account?<a href="/login">Login </a></p>
                        <p>No account?<a href="/signup">Sign up </a></p>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='button'>Reset Passwords</Button>
                    </Form.Group>
                    <Form.Group>
                        <Button href="/">Home</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        
    </div>
  )
}

export default ForgotPassword;
