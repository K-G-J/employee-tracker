const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

module.exports = { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment };