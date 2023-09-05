//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 11/09/23
//Description : Component needed for viewing records in tables.js

import React from "react";

const ReadOnlyRow = ({ client, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{client.email}</td>
      <td>{client.password}</td>
      <td>{client.firstName}</td>
      <td>{client.lastName}</td>
      <td>
        <div className="button-container">
          <button className="btn btn-primary" onClick={(e) => handleEditClick(e, client)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteClick(client.id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;