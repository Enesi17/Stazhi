
//Created by  : Enes Smajli 
//Date        : 13/09/23
//Last Update : 13/09/23
//Description : addClients.js is used to render the form

import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "firebase/compat/firestore";
import { firestore } from '../firebase';
import "../index.css"
import Tutorial from "./Tutorial.js"
import Home from "./Home"
import Applications from "./Applications";

const AddApplication = () => {

 
  const {currentUser} = useAuth();
  const [isAddClientVisible, setIsAddClientVisible] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [clients, setClients] = useState([]);
  const [addFormData, setAddFormData] = useState({
    appsName: "",
    type: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await firestore.collection(currentUser.email).get();
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(usersData);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    };
  
    fetchData();
  }, []);

  const handleAddClient = () => {
    setIsAddClientVisible(!isAddClientVisible);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
  
    const newClient = {
      appsName: addFormData.appsName,
      type: addFormData.type,
      username: addFormData.username,
      password: addFormData.password,
    };
  
    try {
      await firestore.collection(currentUser.email).add(newClient);
      setAddFormData({
        appsName: "",
        type: "",
        username: "",
        password: ""
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding client to Firestore: ', error);
    }

    setIsAddClientVisible(false);
    setTimeout(function () {window.location.pathname = '/applications';}, 100);
    
  };

  const handleCancelClick = () => {
    setIsAddClientVisible(false);
  };

    return (  
        <div>
          {currentUser && <div>
          {!showTutorial && <div>
            {isAddClientVisible ? (
              <Row>
              <Col className="border p-3">
                <h2>Add a new client</h2>
                <Form onSubmit={handleAddFormSubmit} >
                  <Form.Group>
                  {!currentUser && <Alert variant="danger">You need to log in first to be able to add</Alert>}
                    <Form.Control className='form-input-container'
                      type="text"
                      name="appsName"
                      required
                      placeholder="Enter name for application..."
                      onChange={handleAddFormChange}
                   />
                    <Form.Control className='form-input-container'
                      type="text"
                      name="type"
                      required
                      placeholder="Enter database type..."
                      onChange={handleAddFormChange}
                    />
                    <Form.Control className='form-input-container'
                      type="text"
                      name="username"
                      required
                      placeholder="Enter username..."
                      onChange={handleAddFormChange}
                    />
                    <Form.Control className='form-input-container'
                      type="password"
                      name="password"
                      required
                      placeholder="Enter password ..."
                      onChange={handleAddFormChange}
                    />
                  </Form.Group>
                    <Col>
                      <Button type="submit">
                        Add
                      </Button>
                   </Col>
                    <Col>
                      <Button type="button" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </Col>
                </Form>
              </Col>
            </Row>
            ):(
              <Button className="addNewClient" onClick={handleAddClient}>
                Add New Application
              </Button>
            )}
          </div>}
          {showTutorial && <Applications />}
        </div>}
        {!currentUser && <Home />}
        </div>
   );
}
 
export default AddApplication;