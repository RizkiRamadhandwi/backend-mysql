let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_express_api",
});

connection.connect((err, connection) => {
  if (!err) {
    console.log("Connected to DB");
  } else {
    console.log(err);
  }
});

module.exports = connection;
