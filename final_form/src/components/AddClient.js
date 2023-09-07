
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

const AddClient = () => {

 
  const {currentUser} = useAuth();
  const [isAddClientVisible, setIsAddClientVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [addFormData, setAddFormData] = useState({
    email:"",
    password:"",
    firstName:"",
    lastName:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await firestore.collection('users').get();
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
      email: addFormData.email,
      password: addFormData.password,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
    };
  
    try {
      await firestore.collection('users').add(newClient);
      setAddFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding client to Firestore: ', error);
    }
    
    setIsAddClientVisible(false);
  };

  const handleCancelClick = () => {
    setIsAddClientVisible(false);
  };

    return (  
        <div>
          {isAddClientVisible ? (
            <Row>
            <Col className="border p-3">
              <h2>Add a new client</h2>
              <Form onSubmit={handleAddFormSubmit} >
                <Form.Group>
                {!currentUser && <Alert variant="danger">You need to log in first to be able to add</Alert>}
                  <Form.Control className='form-input-container'
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email ..."
                    onChange={handleAddFormChange}
                  />
                  <Form.Control className='form-input-container'
                    type="password"
                    name="password"
                    required
                    placeholder="Enter password ..."
                    onChange={handleAddFormChange}
                  />
                  <Form.Control className='form-input-container'
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter first name ..."
                    onChange={handleAddFormChange}
                  />
                  <Form.Control className='form-input-container'
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter last name..."
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
              Add New Client
            </Button>
          )}
        </div>
   );
}
 
export default AddClient;