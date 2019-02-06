CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Micro USB Charger", "Electronics", 7.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bluetooth Earbuds", "Electronics", 29.99, 200);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Dress Shirt", "Clothing" ,49.99, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Frying Pan", "Kitchen", 20.00, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Best Selling Book", "Books", 4.99, 1000000);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("32-inch 4K Monitor", "Electronics", 450.00, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Wireless Keyboard", "Electronics", 119.99, 75);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Carry-on Suitcase", "Luggage", 49.99, 120);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Dress Shoes", "Clothing", 249.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Phone Case", "Cell Phones & Accessories", 35.00, 300);

CREATE TABLE departments(
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    overhead_costs INTEGER(11) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, overhead_costs) VALUES("Electronics", 5000);
INSERT INTO departments(department_name, overhead_costs) VALUES("Clothing", 0);
INSERT INTO departments(department_name, overhead_costs) VALUES("Kitchen", 0);
INSERT INTO departments(department_name, overhead_costs) VALUES("Books", 0);
INSERT INTO departments(department_name, overhead_costs) VALUES("Luggage", 0);
INSERT INTO departments(department_name, overhead_costs) VALUES("Cell Phones & Accessories", 0);

ALTER TABLE products 
ADD product_sales INTEGER(11) NOT NULL;