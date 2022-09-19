const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'database-vero.ccbcxmwt9ri3.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Armstrong23',
  database: 'pavana2',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
