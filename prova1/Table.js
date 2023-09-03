import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import {Form} from "react-bootstrap"
import data from "../jsonData/clients.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const Table = () => {
    const [clients, setClients] = useState(data);
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

  const [editClientId, setEditClientId] = useState(null);

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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newClient = {
        ID: nanoid(),
        email: addFormData.email,
        password:addFormData.password,
        firstName:addFormData.firstName,
        lastName: addFormData.lastName
    };

    const newClients = [...clients, newClient];
    setClients(newClients);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedClient = {
      ID: editClientId,
      email: editFormData.email,
      password: editFormData.password,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
    };

    const newClients = [...clients];

    const index = clients.findIndex((client) => client.id === editClientId);

    newClients[index] = editedClient;

    setClients(newClients);
    setEditClientId(null);
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

  const handleDeleteClick = (clientId) => {
    const newClients = [...clients];

    const index = clients.findIndex((client) => client.id === clientId);

    newClients.splice(index, 1);

    setClients(newClients);
  };

  return (
    <div>
        <Form onSubmit={handleEditFormSubmit}>
        <Table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {clients.map((client) => (
              <Fragment>
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
    <h2>Add a Client</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input
        type="text"
        name="email"
        required="required"
        placeholder="Enter a email..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="password"
        required="required"
        placeholder="Enter an password..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="firstName"
        required="required"
        placeholder="Enter a first name..."
        onChange={handleAddFormChange}
      />
      <input
        type="email"
        name="lastName"
        required="required"
        placeholder="Enter an last name..."
        onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
    </div>
  );
}
 
export default Table;