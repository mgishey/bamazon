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

// Display items available for sale

function start() {
    db.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log("Motorcycles and Gear For Sale:")
        console.table(res);
        placeOrder();
    });
}

function placeOrder() {
    inquirer
        .prompt([
            {
                name: "itemID",
                message: "Please provide the ID# of the product to buy:"
            },
            {
                name: "buyQuantity",
                message: "How many units do you wish to buy"
            }
        ])
        .then(ans => {
            console.log("Item selected " + ans.itemID);
            console.log("Quantity: " + ans.buyQuantity);
            db.end();
        });
}



