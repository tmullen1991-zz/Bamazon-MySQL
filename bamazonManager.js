var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Enter Password Here",
    database: "bamazon_db"
});
connection.query("SELECT * FROM products", function (err, res) {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Select info you want to know:",
                choices: ["Products for Sale", "Low Inventory", "Add Inventory", "Add New Porduct"]
            }
        ])
        .then(response => {
            switch (response.choice) {
                case "Products for Sale":
                    console.table(res);
                    connection.end();
                    break;
                case "Low Inventory":
                    connection.query("SELECT * FROM products WHERE  stock_quantity <= 5", function (err, res) {
                        console.table(res)
                    })
                    connection.end();
                    break;
                case "Add Inventory":
                    console.table(res)
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Which id would you like to add stock to?",
                                name: "product_id"
                            },
                            {
                                type: "input",
                                message: "How much stock would you like to add?",
                                name: "stock_quantity"
                            }
                        ])
                        .then(stockUp => {

                            var id = parseInt(stockUp.product_id)
                            var amount = res[id - 1].stock_quantity + parseInt(stockUp.stock_quantity)
                            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [amount, id], function (err, stockRes) {
                                if (err) throw err
                                connection.end();
                            })
                        })

                    break;
                case "Add New Porduct":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Enter the product display name: ",
                                name: "product_name"
                            },
                            {
                                type: "input",
                                message: "Enter product department: ",
                                name: "department_name"
                            },
                            {
                                type: "input",
                                message: "Enter price for one unit: ",
                                name: "price"
                            },
                            {
                                type: "input",
                                message: "Enter am0unt in stock: ",
                                name: "stock_quantity"
                            }
                        ])
                        .then(addItem => {

                            connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales) VALUES( ? , ? , ? ,? , 0)", [addItem.product_name, addItem.department_name, addItem.price, addItem.stock_quantity], function (err, stockRes) {
                                if (err) throw err

                                connection.end();
                            })
                        })
                    break;
                default:
                    connection.end();
            }
        });
});
