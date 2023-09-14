
//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 14/09/23
//Description : tables.js is the main component, it coontains the data view, edit and delete options

import React from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import AddApplication from "./AddApplication"
import Home from "./Home"
import LogOut from "./LogOut";
import axios from "axios";

import { useState, Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Table, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { firestore } from '../firebase';

import "../index.css"
import "firebase/compat/firestore";


const Applications = () => {

  const [isAddApplicationVisible, setIsAddApplicationVisible] = useState(false);

  const [applications, setApplications] = useState([]);

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
    window.location.reload();
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
  
    if (shouldDelete) {
      try {
        // Get the application data before deleting it
        const appSnapshot = await firestore.collection(currentUser.email).doc(appId).get();
        const appData = appSnapshot.data();
        console.log('App Data:', appData);
        // Delete the application document in Firestore
        await firestore.collection(currentUser.email).doc(appId).delete();
  
        // Get the username from the application data
        const { appsName } = appData;
  
        if (appsName) {
          // Send a request to your Express server to drop the associated database
          await axios.post('http://localhost:8000/dropDatabase', { appsName });
        }
  
        // Update your applications state as needed
        const newApplications = applications.filter((app) => app.id !== appId);
        setApplications(newApplications);
        window.location.reload();
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
        <h1 className="title">Table View-Application's Table</h1>
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
                     <th>Actions</th>
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
                       </Fragment>
                      ))}
                    </tbody>
                  </Table>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
               <div className="bttns">
                  <a href="/addApplication"><button className="btnAPP"> Add New Application </button></a>
                  <a href="/"><button className="btnAPP">Home</button></a>
               </div>
              </Col>
              <LogOut />
            </Row>
          </Container>
        </div>
      }
      { !currentUser && <Home />}
      </div>
     );
}
 
export default Applications;