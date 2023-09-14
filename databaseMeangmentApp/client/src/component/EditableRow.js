//Created by  : Enes Smajli 
//Date        : 07/09/23
//Last Update : 11/09/23
//Description : Component needed for editing records in tables.js

import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name for your new application..."
          name="appsName"
          value={editFormData.appsName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a type..."
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a userName..."
          name="username"
          value={editFormData.username}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a password..."
          name="password"
          value={editFormData.password}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="btnAPPedit" type="submit" onClick={handleEditFormSubmit}>
          Save
        </button>
        <button className="btnAPPdelete" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;