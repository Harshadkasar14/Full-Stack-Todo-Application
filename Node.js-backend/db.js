const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Harshad@2003',
  database: 'todo_users'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;
