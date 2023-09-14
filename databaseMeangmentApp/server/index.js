
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); 

app.use(cors());
app.use(bodyParser.json());


const db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'Enesi-1707',
  database        : ''
});

app.post('/createDatabase', async (req, res) => {
    const { appsName } = req.body; // Get the username from the request body
  
    // Use the username to create the database
    db.query(`CREATE DATABASE IF NOT EXISTS ${appsName}`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error creating database', details: err.message });
      } else {
        console.log(result);
        res.status(200).json({ message: 'Database created successfully' });
      }
    });
});

app.post('/dropDatabase', async (req, res) => {
    const { appsName } = req.body; // Get the username from the request body
  
    if (appsName) {
      // Use the username to drop the database
      db.query(`DROP DATABASE IF EXISTS ${appsName}`, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Error dropping database', details: err.message });
        } else {
          console.log(result);
          res.status(200).json({ message: 'Database dropped successfully' });
        }
      });
    } else {
      res.status(400).json({ error: 'Invalid request, missing username' });
    }
});

app.listen(8000, () =>{
    console.log('server listening on port 8000');
})
