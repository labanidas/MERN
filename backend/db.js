
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'user123',
  database: 'task_manager',
});

// module.exports = connection;
export default connection;


