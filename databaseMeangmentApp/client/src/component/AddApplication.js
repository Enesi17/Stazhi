
//Created by  : Enes Smajli 
//Date        : 13/09/23
//Last Update : 13/09/23
//Description : addClients.js is used to render the form

import React from "react";
import Home from "./Home"
import axios from 'axios';
import LogOut from "./LogOut";

import { useState, useEffect } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { firestore } from '../firebase';

import "firebase/compat/firestore";
import "../index.css"

const AddApplication = () => {

 
  const {currentUser} = useAuth();

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

      await axios.post('http://localhost:8000/createDatabase', {
        appsName: addFormData.appsName,
      });
  
      setAddFormData({
        appsName: "",
        type: "",
        username: "",
        password: ""
      });
      
      window.location.reload();
      window.location.pathname = "/applications"

    } catch (error) {
      console.error('Error adding client to Firestore: ', error);
    }
    
  };

  const handleCancelClick = () => {
    setTimeout(function () {window.location.pathname = '/applications';}, 100);
  };

  return (  
        <div className="login">
          {currentUser && 
          <div>
            <Card className='login-container'>
              <Card.Header>
                <h1>Register Application</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleAddFormSubmit} >
                  <Form.Group className='input-container'>
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
                  <div className="bttns">
                      <button className="btnAPP" type="submit" onClick={handleAddFormSubmit}>
                        Add
                      </button>
                      <button className="btnAPP" type="button" onClick={handleCancelClick}>
                        Cancel
                      </button>
                      </div>
                        <LogOut />
                </Form>
              </Card.Body>
            </Card>
        </div>}
        {!currentUser && <Home />}
        </div>
   );
}
 
export default AddApplication;