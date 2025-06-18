
// db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password: 'pass123',
  database: 'railway_db',  
});

module.exports = db;


