const inquirer = require('inquirer');
const db = require('./application/root');
const title = require('./application/title');

roleArray = [];

// display the title graphic
title.header();

// function to make an sure no blank values are submitted
const validateInput = (input) => {
    if (input !== '') {
        return true;
    } else {
        console.log('Must fill out all required information');
        return false;
    };
};

viewEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.id, role.title, role.salary FROM employee JOIN role ON employee.role_id = role.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        init();
    });
};

//Input for a new employee
addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "first_name",
                message: 'What is the employees first name?',
                validate: validateInput,
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?',
                validate: validateInput,
            },
        ])
        .then((results) => {
            const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`;

            db.query(
                sql, [results.first_name, results.last_name],
                (err, results) => {
                    if (err) throw err;
                    console.log(results);
                }
            );
            init();
        })
};

// View All Role
viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(results);
        init();
    });
};

// Update an Existing Employees Role
updateEmployeeRole = () => {
    db.query(`Select * from employee`, (err, result) => {
        if (err) {
            console.log(err);
            //emp is INDEX 
        } const empArray = result.map((emp) => ({
            // value is key and emp is referrring to employee table and it looking for id
            value: emp.id,
            // name is key and emp is referrring to employee table and first name last name
            name: `${emp.first_name} ${emp.last_name}`
        }));
        db.query('SELECT * FROM role', function (err, results) {
            if (err) {
                console.log(err);
            } const roleArray = results.map((role) => ({
                value: role.id,
                name: `${role.title}`
            }));
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'title',
                        message: 'Title of new employee',
                        choices: roleArray,
                        validate: validateInput,
                    },
                    {
                        type: 'list',
                        name: 'empID',
                        message: 'Which employee would you like to update?',
                        choices: empArray,
                    },
                ])
                .then((res) => {
                    const sql = `Update employee SET role_id = ? WHERE id = ?`;

                    db.query(
                        sql, [res.title, res.empID],
                        (err, res) => {
                            if (err) throw err;
                            console.log(res);
                            init();
                        }
                    );
                });
        });
    });
};

// Add A New Role 
addRole = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        } const departmentArray = results.map((dep) => ({
            value: dep.id,
            name: `${dep.name}`
        }));
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: "title",
                    message: 'What is the employees role?',
                    validate: validateInput,
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is there salary?',
                    validate: validateInput,
                },
                {
                    type: 'list',
                    name: 'dep_title',
                    message: 'Which department are they assigned to',
                    choices: departmentArray,
                    validate: validateInput,
                },
            ])
            .then((results) => {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

                db.query(
                    sql, [results.title, results.salary, results.dep_title],
                    (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        init();
                    }
                );
            });
    });
};

// View All Department
viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        init();
    });
};

//Input A New Department
addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "department_name",
                message: 'What department would you like to add?',
                validate: validateInput,
            },
        ])
        .then((results) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;

            db.query(
                sql, [results.department_name,],
                (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    init();
                }
            );
        })
};


//Main Menu Prompt
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "View All Roles",
                    "Update Employee Role",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit",
                ]
            }
        ])
        .then((response) => {
            // Use user feedback for... whatever!!
            switch (response.options) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Quit":
                    db.end();
                    break;
            };
        })
        .catch((error) => {
            if (error) {
                console.log(error)
            };
        });
};

init();