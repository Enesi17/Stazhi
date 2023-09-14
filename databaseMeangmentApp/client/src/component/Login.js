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
          window.location.pathname="/applications";
        } catch {
          setError("Failed to log in")
        }
    
        setLoading(false)
    }

  return (
    <div className="login">
        <Card className='login-container'>
            <Card.Header>
                <h2>LOG IN</h2>
            </Card.Header>
            <Card.Body>
                {error&&<Alert className='info' variant="danger">{error}</Alert>}
                {!error&&<Alert className='info' variant="info">Welcom to our Login page</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='input-container'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} placeholder='Enter email' required/>
                    </Form.Group>
                    <Form.Group className='input-container'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder='Enter password' required/>
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' className='button'>Log In</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <p>Did you <a href="/forgotPassword">forget your password?</a></p>
                        <p>No account? <a href="/signup">Sign Up</a></p>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        
    </div>
  )
}

export default Login;