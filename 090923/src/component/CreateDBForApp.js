
// import { useAuth } from "../context/AuthContext";
// import Home from "./Home"
// import React, { useState } from "react";
// import { Button, Form, Alert } from "react-bootstrap";
// import mysql from "mysql2/promise"; 

// const CreateDBForApp = ({app}) => {
    
//     const [dbCreated, setDbCreated] = useState(false);

//     const handleCreateDB = async () => {
//       try {
//         // Create a MySQL connection
//         const connection = await mysql.createConnection({
//           host: "http://localhost",
//           user: "root",
//           password: "Enesi-1707",
//         });
  
//         await connection.query(`CREATE DATABASE IF NOT EXISTS ${app.appsName}`);
  
//         await connection.end();
  
//         setDbCreated(true);
//       } catch (error) {
//         console.error("Error creating database:", error);
//       }
//     };

//     const { currentUser } = useAuth();

//     return ( 
//         <div>
//             {currentUser &&
//             <div>
//             {dbCreated ? (
//               <Alert variant="success">
//                 Database for {app.appsName} created successfully!
//               </Alert>
//             ) : (
//               <Form>
//                 <Button onClick={handleCreateDB}>Create Database</Button>
//               </Form>
//             )}
//           </div>}
//         {!currentUser && <Home />}
//         </div>
//      );
// }
 
// export default CreateDBForApp;

import React from 'react'

function CreateDBForApp() {
  return (
    <div>On progress...</div>
  )
}

export default CreateDBForApp;
