const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "juliendardennes",
  password: "Criminals13",
  database: "database name",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
