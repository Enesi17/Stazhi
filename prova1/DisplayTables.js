import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import JsonEdit, {MyEditButton, MyDeleteButton, onEdit, onDelete} from './JsonEdit';
import jsonData from "../jsonData/clients.json"

const initialData = jsonData;

const DisplayTables = ( ) => {

  const [data, setData] = useState(initialData);
  
  const onEdit = (id) => {
    
  };

  
  const onDelete = (id, updatedData) => {
   
    setData(updatedData); // Update the data after deletion
  };

  return (
    <Table striped bordered hover>
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
        {data.map((item) => {
          return(
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.email}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td><MyEditButton
                  className="editBtn"
                  label={`Edit`}
                  onClick={() => onEdit(item.ID)}/></td>
              <td><MyDeleteButton
                  className="deleteBtn"
                  label={`Delete ${item.ID}`}
                  onClick={() => onDelete(item.ID)}/></td>
            </tr>
          )
        })}
      </tbody>
      
    </Table>
  );
};

export default DisplayTables;