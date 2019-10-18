var inquirer = require("inquirer");
var mysql = require("mysql");

var buyerQuantity;
var itemId;
.
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
                if (ans.buyQuantity > inStock[0].stock_quantity) {
                    console.log("Sorry, we only have " + inStock[0].stock_quantity + " " + inStock[0].product_name + "s " + "in stock.");
                    db.end();
                } else {
                    var newQuantity = inStock[0].stock_quantity - ans.buyQuantity;
                    buyerQuantity = ans.buyQuantity;
                    var sql = "UPDATE products SET stock_quantity = " + newQuantity + " where item_id = " + ans.itemID;
                    db.query(sql, function (err) {
                        if (err) throw err;
                        //console.log("Update successful!" + "\n");
                        checkOut(buyerQuantity, itemId);
                    });
                }
            });
        });
}

function checkOut(q, i){
    sql2 = "SELECT price, product_name FROM products WHERE item_id = " + i;
    db.query(sql2, function(err,resp){
        if (err) throw err;
        totalPrice = q * resp[0].price;
        console.log("You have purchased " + buyerQuantity + " " + resp[0].product_name + "s");
        console.log("Your grand total comes to: $" + totalPrice + "\n");
        summaryTable(i);
    });   
}

function summaryTable(i){
    sql = "SELECT stock_quantity, product_name FROM products where item_id = " + i;
    db.query(sql, function(err, response){
        if (err) throw err;
        console.log("Updated Stock table:");
        console.table(response);
        db.end();
    });
}




