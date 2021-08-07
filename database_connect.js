// initialisation du module mysql
const mysql = require("mysql");

// identification
const db = mysql.createConnection({
  host: "localhost",
  user: "juliendardennes",
  password: "Criminals13",
});
console.log(db);

// connexion base de données mysql
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  } else {
    console.log("Connected to the database !");
  }
});

// exportation du module sql
module.exports = sql;
