# Bamazon-MySQL

## What is the App?

Bamazon-MySQL is a CLI app that acts as a simple Amazon knock off. The purpose of the app is to use simple MySQL commands in a node CLI to add, change and manioulate table data. The app utilizes inquirer, MySQL and console.table npm package managers to take user input, manipulate the database values and display MySQL object data as a table in node respectively.

## How it Works

The app has three basic functions:

1. Customer View - calls a JS file which connects to a MySQL database and displays a basic table containing a list of products and price info. The user then selects an id number from the table and the amount of units they which to purchase. The values are then changed using MySQL commands sent from the JS file and order results displayed.

![Alt Text](gifs/customer.js)

2. Manager View - prompts the user with 4 choices:

   1. Products for Sale - Simply displays the products for sale table for the user to view.

   ![Alt Text](gifs/products-for-sale.gif)

   2. Low Inventory - Takes only products with a quantity value at or below 5 and displays them.

   ![Alt Text](gifs/low-inv.gif)

   3. Add Inventory - Prompts the user for the product id and amount to add to that product, then uses MySQL commands to change the databse values.

   ![Alt Text](gifs/add-inv.gif)

   4. Add New Porduct - Prompts the user for the new product name, department, unit price, and quantity available for sale numbers. After MySQL commands are used to add a new row to the products for sale table.

   ![Alt Text](gifs/add-item)

3. Supervisor View - Coming soon...

### How the Code Works

JS files are used to connect to a MySQL databse and connection.query functions called from the MySQL npm package manager are used to use basic SQL commands to the database. Query functions are used depending on user input from inquirer. A switch statement is used for the four cases for the manager view app.

### Examples of MySQL Commands

Display Table Data

```
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err
    console.table(res);
    connection.end();
});
```

Manipulating Database Data value from bamazonCustomer.js

```
connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE id = ?",[updatedQuantity, overhead, response.product_id], function(err, res) {
    if (err) throw err
    connection.end();
});
```

Creating a new row for the Products Table taking inquirer input from the user in bamazonManager.js

```
connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales VALUES( ? , ? , ? ,?, 0 )", [addItem.product_name, addItem.department_name, addItem.price, addItem.stock_quantity], function (err, stockRes) {
    if (err) throw err
    connection.end();
});
```
