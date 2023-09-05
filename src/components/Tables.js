
//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 11/09/23
//Description : tables.js is the main component, it coontains the data view, edit and delete options

import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { useAuth } from "../context/AuthContext";
import { Button, Table, Form, Container, Row, Col } from "react-bootstrap";
import "firebase/compat/firestore";
import { firestore } from '../firebase';
import "../index.css"


const Tables = () => {

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

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
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
    } catch (error) {
      console.error('Error adding client to Firestore: ', error);
    }
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
    try {
      await firestore.collection('users').doc(clientId).delete();
      const newClients = clients.filter((client) => client.id !== clientId);
      setClients(newClients);
    } catch (error) {
      console.error('Error deleting client in Firestore: ', error);
    }
  };

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  
    async function handleLogout(event) {
        event.preventDefault();
        setError("");
      
        try {
          await logout();
          window.location.pathname = "/"; // Redirect to the logout route.
          console.log("Logged out successfully...");
        } catch {
          setError("Failed to log out");
          console.log("sdhfsjdfhjskdfhskjdfhsfjkshdfkjshdfkjshfdkjshfjksdhfkjsdhf")
          
        }
     }

    return ( 
      <div className="app-container">
      <Container>
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
          <Col className="border p-3">
            <h2>Add a new client</h2>
            <Form onSubmit={handleAddFormSubmit} >
              <Form.Group>
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
              <Button type="submit">Add</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
     );
}
 
export default Tables;