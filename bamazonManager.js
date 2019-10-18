var inquirer = require("inquirer");
var mysql = require("mysql");

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
    start();
});

function start(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'viewOption',
            message: 'Select Menu Option',
            choices: ['View Products For Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Produt'],

        },
    ]).then(answers => {
        console.log('Answer ' + answers.viewOption);
    });
}