
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const MyEditButton = ({ label, onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      {label}
    </Button>
  );
};

export const MyDeleteButton = ({ label, onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      {label}
    </Button>
  );
};

const JsonEdit = ({ data,  onUpdate, onDelete, onEdit }) => {


  const [selectedId, setSelectedId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    if (selectedId !== null) {
      const updatedData = data.map((item) =>
        item.ID === selectedId ? { ...item, ...editedData } : item
      );
      onEdit(id);
      setSelectedId(null);
      setEditedData({});
    }
  };
  
  const handleDelete = (id) => {
    if (selectedId !== null) {
      const updatedData = data.filter((item) => item.ID !== selectedId);
      onDelete(id, updatedData);
      setSelectedId(null);
      setEditedData({});
    }
  };

  const handleSave = () => {
    if (selectedId !== null) {
      onUpdate(data);
      setSelectedId(null);
      setEditedData({});
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Edit data"
            value={editedData.email || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Edit data"
            value={editedData.firstName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Edit data"
            value={editedData.lastName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Form>
      
    </div>
  );
};

export default JsonEdit;