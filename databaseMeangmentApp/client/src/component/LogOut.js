//Created by  : Enes Smajli 
//Date        : 13/09/23
//Last Update : 14/09/23
//Description : LogOut.js component, it makes the loguot happen

import React, {useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Row, Col } from "react-bootstrap";

const LogOut = () => {

    const [error, setError] = useState("")
    const { logout } = useAuth();

    async function handleLogout(event) {
        event.preventDefault();
        setError("");
      
        try {
          await logout();
          window.location.reload();
          window.location.pathname = "/"
          console.log("Logged out successfully...");
        } catch {
          setError("Failed to log out");
        }
     }

    return ( 
        <Row>
          <Col>
            <button className="btnAPPlogout" onClick={handleLogout}>
              Log Out
            </button>
          </Col>
        </Row>
     );
}
 
export default LogOut;