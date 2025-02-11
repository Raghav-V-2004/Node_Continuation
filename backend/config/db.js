// config/db.js
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Update with your MySQL user
  password: 'root',  // Update with your MySQL password
  database: 'blog_db',  // Update with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  }
  console.log('Connected to the database');
});

module.exports = db;
