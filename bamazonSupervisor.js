var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Enter Password Here",
  database: "bamazon_db"
});

inquirer
  .prompt([
    {
      type: "list",
      name: "choice",
      message: "Select info you want to know:",
      choices: ["View Product Sales by Department", "Create New Department"]
    }
  ])
  .then(response => {
    switch (response.choice) {
      case "View Product Sales by Department":
        connection.query("SELECT * FROM products", function(err, res) {
          console.table(res);
        });
        connection.query("SELECT * FROM departments", function(err, res2) {
          console.table(res2);
        });
        connection.end();
        break;
      case "Create New Department":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter department name: ",
              name: "department_name"
            },
            {
              type: "input",
              message: "Enter overhead costs: ",
              name: "overhead_costs"
            }
          ])
          .then(newDepartment => {
            connection.query(
              "INSERT INTO departments(department_name, overhead_costs) VALUES(? , ?)",
              [newDepartment.department_name, newDepartment.overhead_costs],
              function(err, departments) {
                if (err) throw err;
                console.table(departments);
                console.log(departments);
              }
            );
            connection.end();
          });
        break;
      default:
    }
  });
