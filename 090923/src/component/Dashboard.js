//Created by  : Enes Smajli 
//Date        : 08/09/23
//Last Update : 14/09/23
//Description : Options.js is like a bar for the user where the user can choose where to go in the app

import Home from "./Home"
import { useAuth } from "../context/AuthContext";
import React, {useState} from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';


const Dashboard = () => {
    const [error, setError] = useState("");
    const { logout } = useAuth();
    const { currentUser } = useAuth();
    let admin = currentUser.email;

    async function handleLogout(event) {
        event.preventDefault();
        setError("");
      
        try {
          await logout();
          window.location.reload();
          window.location.pathname = "/"; 
          console.log("Logged out successfully...");
        } catch {
          setError("Failed to log out");
        }
     }
  
     return (
      <div>
        { currentUser && <Container style={{itemsAlign:"center"}}>
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
              <Button href="/applications" className="custom-button">My Applicatoin</Button>
            </Col>
            <Col md={5}>
              <Button href="/addApplication" className="custom-button">Add Applicatoin</Button>
            </Col>
          </Row>
          <Row>
          <Col md={10}>
              <Button href="/createDB" className="custom-button">Create Databese for Applicatoin</Button>
            </Col>
          </Row>
          
          {admin === 'veton@gmail.com' && (
            <Row>
            <Col md={10}>
              <Button href="/client" className="custom-button">
                View Users
              </Button>
              </Col>
          </Row>
          )}
            
          <Row>
            <Col md={5}>
              <Button href="/forgotPassword" className="custom-button">Reset Password</Button>
            </Col>
            <Col md={5}>
              <Button href="/" className="custom-button" onClick={handleLogout}>Log out</Button>
            </Col>
          </Row>
        </Container>}
        {!currentUser && <Home />}
      </div>
    );
    
}
 
export default Dashboard;