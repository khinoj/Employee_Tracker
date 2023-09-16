const express = require('express');
// const inquirer = require('inquirer');
const path = require('path');
const mysql = require('mysql2');
const mainMenu = require('./prompt');

let sql;

const PORT = process.env.PORT || 3001;

const app = express();
