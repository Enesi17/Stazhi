//Created by  : Enes Smajli 
//Date        : 08/09/23
//Last Update : 13/09/23
//Description : Options.js is like a bar for the user where the user can choose where to go in the app

import { useAuth } from "../context/AuthContext";
import React, {useState} from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';


const Options = () => {
    const [error, setError] = useState("");
    const { logout } = useAuth();

    
    async function handleLogout(event) {
        event.preventDefault();
        setError("");
      
        try {
          await logout();
          window.location.reload();
          window.location.pathname = "/login"; 
          console.log("Logged out successfully...");
        } catch {
          setError("Failed to log out");
        }
     }
  
     return (
      <div>
        <Container style={{itemsAlign:"center"}}>
          <Row>
            <Col md={5}>
              <Button href="/" className="custom-button">Home</Button>
            </Col>
            <Col md={5}>
              <Button href="/signup" className="custom-button">Sign up</Button>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Button href="/login" className="custom-button">Log in</Button>
            </Col>
            <Col md={5}>
              <Button href="/login" className="custom-button">Tabelat</Button>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Button href="/forgotPassword" className="custom-button">Forgot Password</Button>
            </Col>
            <Col md={5}>
              <Button href="/" className="custom-button" onClick={handleLogout}>Log out</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
    
}
 
export default Options;
