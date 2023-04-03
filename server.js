const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// create an express app
const app = express();
app.use(cors());

// create a MySQL pool
const pool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    requireSecureTransport: true
  }
});

// middleware to parse JSON request bodies
app.use(express.json());

// endpoint to add a new user to the database
app.post('/add-user', async (req, res) => {
  const { name, email } = req.body;
  try {
    // get a connection from the pool
    const connection = await pool.getConnection();
    // insert the new user into the database
    await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    // release the connection back to the pool
    connection.release();
    // return a success message
    res.status(201).send('User added successfully');
  } catch (error) {
    console.error(error);
    // return an error message
    res.status(500).send('Error adding user');
  }
});

// endpoint to get a list of all users in the database
app.get('/list-users', async (req, res) => {
  try {
    // get a connection from the pool
    const connection = await pool.getConnection();
    // retrieve all users from the database
    const [rows] = await connection.query('SELECT * FROM users');
    // release the connection back to the pool
    connection.release();
    // return the list of users
    res.status(200).send(rows);
  } catch (error) {
    console.error(error);
    // return an error message
    res.status(500).send('Error retrieving users');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
