require("dotenv").config();
const mysql = require("mysql");

const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_URI = process.env.MYSQL_URI;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_DATABASE_NAME = process.env.MYSQL_DATABASE_NAME;
const MYSQL_TABLE_NAME = process.env.MYSQL_TABLE_NAME;

/* 
 Creating the MySQL Database connection
*/
var dbConn = mysql.createConnection({
  host: MYSQL_URI,
  port: MYSQL_PORT,
  user: MYSQL_USERNAME,
  database: MYSQL_DATABASE_NAME,
});

// Connecting to MySQL Database
dbConn.connect(function (error: any) {
  if (!!error) {
    console.log(error);
  } else {
    console.log(`Connected to the MySQL Server at PORT: ${MYSQL_PORT}`);
  }
});

module.exports = dbConn;
