var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Enter Password Here",
  database: "bamazon_db"
});
connection.query("SELECT * FROM products", function(err, res) {
  console.table(res);
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please select a product ID you wish to buy:",
        name: "product_id"
      },
      {
        type: "input",
        message: "Please enter the quantity number you wish to buy:",
        name: "quantity_wanted"
      }
    ])
    .then(response => {
      if (res[0].stock_quantity === 0) {
        console.log("Item not in stock. NO SOUP FOR YOU!!!");
      } else {
        var updatedQuantity =
          res[response.product_id - 1].stock_quantity -
          response.quantity_wanted;
        var price =
          res[response.product_id - 1].price * response.quantity_wanted;
        var overhead = res[response.product_id - 1].product_sales + price;
        console.log("Your order has been placed! Total: $" + price);
        connection.query(
          "UPDATE products SET stock_quantity = ?, product_sales = ? WHERE id = ?",
          [updatedQuantity, overhead, response.product_id],
          function(err, res) {
            if (err) throw err;
          }
        );
      }
      connection.end();
    });
});
