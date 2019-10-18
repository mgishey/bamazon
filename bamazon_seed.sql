DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yamaha V-Star 1300 Tourer", "Bikes", 14280.99, 5),
("Honda V65 Magna", "Bikes", 3999.99, 8),
("Honda Nighthawk 250", "Bikes", 6200.99, 9),
("Shoei RF-1200 Variable Helmet", "Helmets", 589.99, 30),
("Troy Lee SE4 Skully Helmet", "Helmets", 479.00, 45),
("Street & Steel Heavy Duty Chaps", "Pants", 199.99, 65),
("Bilt Apollo Waterproof Pants", "Pants", 59.97, 34),
("Fox Racing Pawtector Gloves", "Gloves", 39.95, 98),
("Bilt Sprint Gloves", "Gloves", 29.99, 89),
("Cortech Relic Jacket", "Jackets", 299.99, 32),
("Sedici Federico Jacket", "Jackets", 149.99, 67),
("Sedici Niccolo Boots", "Boots", 119.99, 68),
("Bilt Commando Boots", "Boots", 49.97, 94)
);


