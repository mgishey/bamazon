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

function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'viewOption',
                message: 'Select Menu Option',
                choices: ['View Products For Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit'],

            },
        ]).then(answers => {
            switch (answers.viewOption) {
                case 'View Products For Sale':
                    forSale();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addNew();
                    break;
                case 'Quit':
                    db.end();
                default:
                    forSale();
            }
        });
}

function forSale() {
    console.log("FOR SALE!!!");
    let sql = "SELECT item_id, product_name, price, stock_quantity FROM products";
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        db.end();
    });
}

function lowInventory() {
    let sql = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
    db.query(sql, function (err, res) {
        if (err) throw err;
        console.table(res);
        db.end();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: 'itemID',
                message: "Select product to add inventory by ID"
            },
            {
                name: 'quantity',
                message: 'How many would you like to add'
            }
        ]).then(ans => {
            let sql = "SELECT stock_quantity FROM products WHERE item_id = " + ans.itemID;
            db.query(sql, function (err, res) {
                if (err) throw err;
                let newQuantity = parseInt(res[0].stock_quantity) + parseInt(ans.quantity);
                let sql1 = "UPDATE products SET stock_quantity = " + newQuantity + " WHERE item_id = " + ans.itemID;
                db.query(sql1, function (err, resp) {
                    if (err) throw err;
                    //console.log(resp);
                    db.end();
                });
            });
        });
}

function addNew() {
    inquirer
        .prompt([
            {
                name: 'product',
                message: 'Enter product name:'
            },
            {
                name: 'dept',
                message: 'Enter a department:'
            },
            {
                name: 'price',
                message: 'Enter price:'
            },
            {
                name: 'quantity',
                message: 'Enter number of units:'
            }
        ]).then(ans => {
            let sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + ans.product + "', '" + ans.dept + "', '" + ans.price + "', '" + ans.quantity + "')";
            //console.log(sql);
            db.query(sql, function (err, resp) {
                if (err) throw err;
                console.log(ans.quantity + " " + ans.product + "s added to inventory");
                db.end();
            });
        });  
}