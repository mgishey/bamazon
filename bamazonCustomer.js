var inquirer = require("inquirer");
var mysql = require("mysql");

var buyerQuantity;
var itemId;

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
                message: "How many units do you wish to buy?"
            }
        ])
        .then(ans => {
            itemId = ans.itemID;
            db.query("SELECT stock_quantity, product_name FROM products WHERE item_id = ?", ans.itemID, function (err, inStock) {
                if (err) throw err;
                console.log("In Stock table:")
                console.table(inStock);
                //console.log(inStock[0].stock_quantity + " " + inStock[0].product_name + "s " + "in stock.");
                if (ans.buyQuantity > inStock[0].stock_quantity) {
                    console.log("Sorry, we only have " + inStock[0].stock_quantity + " " + inStock[0].product_name + "s " + "in stock.");
                    db.end();
                } else {
                    var newQuantity = inStock[0].stock_quantity - ans.buyQuantity;
                    buyerQuantity = ans.buyQuantity;
                    var sql = "UPDATE products SET stock_quantity = " + newQuantity + " where item_id = " + ans.itemID;
                    db.query(sql, function (err) {
                        if (err) throw err;
                        console.log("Update successful!" + "\n");
                        //buyerPrice = buyerQuantity * res.price;
                        //console.log(buyerPrice);
                        checkOut(buyerQuantity, itemId);
                        //db.end();
                    });
                }
            });
        });
}

function checkOut(q, i){
    sql2 = "SELECT price FROM products WHERE item_id = " + i;
    db.query(sql2, function(err,resp){
        if (err) throw err;
        totalPrice = q * resp[0].price;
        console.log("Your grand total comes to: $" + totalPrice + "\n");
        summaryTable(i);
    });   
}

function summaryTable(i){
    sql = "SELECT stock_quantity, product_name FROM products where item_id = " + i;
    db.query(sql, function(err, response){
        if (err) throw err;
        console.log("Updated In Stock table:");
        console.table(response);
        db.end();
    });
}




