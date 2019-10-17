var inquirer = require("inquirer");
var mysql = require("mysql");

// First thing you do is connect to the database and then you
// start with a function to main program.
// Create the connection information for the sql database
var db = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
db.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start(){
    db.query("SELECT * FROM bamazon_db", function(err, res){
        if (err) throw err;
        console.table(res);
    });
}



db.end();