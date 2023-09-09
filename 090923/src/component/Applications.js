
//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 14/09/23
//Description : tables.js is the main component, it coontains the data view, edit and delete options

import React from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import AddApplication from "./AddApplication"
import Home from "./Home"
import CreateDBForApp from "./CreateDBForApp";

import { useState, Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Table, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { firestore } from '../firebase';

import "../index.css"
import "firebase/compat/firestore";


const Applications = () => {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, characters.length - 1);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

  const [isAddApplicationVisible, setIsAddApplicationVisible] = useState(false);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const [applications, setApplications] = useState([]);

  const [addFormData, setAddFormData] = useState({
    appsName: "",
    type: "",
    username: "",
    password: ""
    
  });

  const [editFormData, setEditFormData] = useState({
    appsName: "",
    type: "",
    username: "",
    password: ""
  });

  const [editApplicationId, setEditApplicationId] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await firestore.collection(currentUser.email).get();
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(usersData);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    };
  
    fetchData();
  }, []);

  const handleAddApplication = async () => {
    // Generate a random username and password (you can customize this part)
    const username = getRandomString(10);
    const password = getRandomString(10);
  
    const newApplication = {
      appsName: addFormData.appsName,
      type: addFormData.type,
      username: username,
      password: password,
    };
  
    try {
      // Add the new application to Firestore
      const docRef = await firestore.collection(currentUser.email).add(newApplication);
      
      // Update the state to include the new application
      setApplications([...applications, { id: docRef.id, ...newApplication }]);
      
      // Clear the form
      setAddFormData({
        appsName: "",
        type: "",
        username: username,
        password: password
      });
    } catch (error) {
      console.error('Error adding application to Firestore: ', error);
    }
    setIsAddApplicationVisible(true);
  };
  
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
  
    const editedApplication = {
      appsName: editFormData.appsName,
      type: editFormData.type,
      username: editFormData.username,
      password: editFormData.password
    };
  
    try {
      await firestore.collection(currentUser.email).doc(editApplicationId).update(editedApplication);
      setEditApplicationId(null);
    } catch (error) {
      console.error('Error editing client in Firestore: ', error);
    }
  };

  const handleEditClick = (event, app) => {
    event.preventDefault();
    setEditApplicationId(app.id);
  
    const formValues = {
      appsName: app.appsName,
      type: app.type,
      username: app.username,
      password: app.password
    };
  
    setEditFormData(formValues);
    
  };

  const handleCancelClick = () => {
    setEditApplicationId(null);
  };


  const handleDeleteClick = async (appId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this client?");

    if(shouldDelete)
    {
      try {
        await firestore.collection(currentUser.email).doc(appId).delete();
        const newApplications = applications.filter((app) => app.id !== appId);
        setApplications(newApplications);
      } catch (error) {
        console.error('Error deleting client in Firestore: ', error);
      }
    }
  };

  
  const { currentUser, logout } = useAuth()
  let goLogin = false;

  return ( 
      <div>
        {
        currentUser &&  <div className="app-container">
        <h2>Table View-Application's Table</h2>
          <Container>
            {!currentUser && <Alert variant="danger">You need to log in first</Alert>}
            <Row>
              <Col>
                <Form onSubmit={handleEditFormSubmit}>
                  <Table responsive striped bordered hover> 
                    <thead className="thead-dark"> 
                    <tr>
                     <th>Application Name</th>
                     <th>Database Type</th>
                     <th>UserName</th>
                     <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                       <Fragment key={app.id}>
                        {editApplicationId === app.id ? (
                        <EditableRow
                         editFormData={editFormData}
                         handleEditFormChange={handleEditFormChange}
                         handleCancelClick={handleCancelClick}
                        />
                        ) : (
                        <ReadOnlyRow
                         app={app}
                         handleEditClick={handleEditClick}
                         handleDeleteClick={handleDeleteClick}
                        />
                        )}
                        {/* <td>
                          <CreateDBForApp app={app} />
                        </td> */}
                       </Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
              {isAddApplicationVisible && <AddApplication />}
              {!isAddApplicationVisible && 
               <Button href="/addApplication"> Add New Application </Button>}
              </Col>
            </Row>
          </Container>
        </div>
      }
      { !currentUser && <Home />}
      </div>
     );
}
 
export default Applications;