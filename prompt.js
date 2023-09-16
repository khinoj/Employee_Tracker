const express = require('express');
const inquirer = require('inquirer');

const app = express();

mainMenu = () => {
    inquirer
        .prompt([
            {
                /* Pass your questions in here */
    
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit",
                ]
            }
        ])
        .then((response) => {
            // Use user feedback for... whatever!!
            switch(response.options) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                
            }
    
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
    };