//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 11/09/23
//Description : Component needed for viewing records in tables.js

import React from "react";

const ReadOnlyRow = ({ app, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{app.appsName}</td>
      <td>{app.type}</td>
      <td>{app.username}</td>
      <td>{app.password}</td>
      <td>
        <div className="button-container">
          <button className="btnAPPedit" onClick={(e) => handleEditClick(e, app)}>
            Edit
          </button>
          <button className="btnAPPdelete" onClick={() => handleDeleteClick(app.id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;