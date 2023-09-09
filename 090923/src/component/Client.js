
//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 14/09/23
//Description : tables.js is the main component, it coontains the data view, edit and delete options

import React from "react";
import ReadOnlyRow from "./ReadOnlyRowAdmin";
import EditableRow from "./EditableRow";
import AddClient from "./AddClient";
import Home from "./Home"
import { useState, Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Table, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { firestore } from '../firebase';

import "../index.css"
import "firebase/compat/firestore";
import Dashboard from "./Dashboard";


const Client = () => {
  
 
  const [isAddClientVisible, setIsAddClientVisible] = useState(false);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const [clients, setClients] = useState([]);

  const [addFormData, setAddFormData] = useState({
    email:"",
    password:"",
    firstName:"",
    lastName:""
  });

  const [editFormData, setEditFormData] = useState({
    email:"",
    password:"",
    firstName:"",
    lastName:""
  });

  const [editClientId, setEditClientId] = useState();
  
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
  
    const editedClient = {
      email: editFormData.email,
      password: editFormData.password,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
    };
  
    try {
      await firestore.collection('users').doc(editClientId).update(editedClient);
      setEditClientId(null);
    } catch (error) {
      console.error('Error editing client in Firestore: ', error);
    }
  };

  const handleEditClick = (event, client) => {
    event.preventDefault();
    setEditClientId(client.id);
  
    const formValues = {
      email: client.email,
      password: client.password,
      firstName: client.firstName,
      lastName: client.lastName,
    };
  
    setEditFormData(formValues);
    
  };

  const handleCancelClick = () => {
    setEditClientId(null);
  };


  const handleDeleteClick = async (clientId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this client?");

    if(shouldDelete)
    {
      try {
        await firestore.collection('users').doc(clientId).delete();
        const newClients = clients.filter((client) => client.id !== clientId);
        setClients(newClients);
      } catch (error) {
        console.error('Error deleting client in Firestore: ', error);
      }
    }
  };

  
  const { currentUser, logout } = useAuth()
  let goLogin = false;

  return ( 
      <div>
        { currentUser && <div className="app-container">
        <h2>Table View-Client's Table</h2>
          <Container>
            {!currentUser && <Alert variant="danger">You need to log in first</Alert>}
            <Row>
              <Col>
                <Form onSubmit={handleEditFormSubmit}>
                  <Table responsive striped bordered hover> {/* Apply Bootstrap table classes */}
                    <thead className="thead-dark"> {/* Add the thead-dark class */}
                    <tr>
                      <th>Email</th>
                      <th>Password</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                       <Fragment key={client.id}>
                        {editClientId === client.id ? (
                        <EditableRow
                         editFormData={editFormData}
                         handleEditFormChange={handleEditFormChange}
                         handleCancelClick={handleCancelClick}
                        />
                        ) : (
                        <ReadOnlyRow
                         client={client}
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
              {isAddClientVisible && <AddClient />}
              {!isAddClientVisible && 
              <Button className="addNewClient" onClick={handleAddClient}>
                 Add New
              </Button>}
              </Col>
            </Row>
          </Container>
        </div>}
        {!currentUser && <Home />}
      </div>
     );
}
 
export default Client;