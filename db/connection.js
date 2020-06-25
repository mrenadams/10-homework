const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "San18diego",
    database: "employees"
});

//establish connection
connection.connect();

//use connection queies as promises
connection.query = util.promisify(connection.query);

module.exports = connection;