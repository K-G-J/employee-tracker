const db = require('../db/connection');
const cTable = require('console.table');

// view all departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('All Departments:', res);
        prompt();
    })
};
// view all roles 
function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('All Roles:', res);
        prompt();
    })
};
// view all employees
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table('All Employees:', res);
        prompt();
    })
};
// view employees by manager 
function viewByManager() {
    const sql = `SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee ORDER BY employee.manager_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Employees by Manager:', res);
        prompt();
    })
};
// view employees by department 
function viewByDepartment() {
    const sql = `SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY employee.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('Employees by Department:', res);
        prompt();
    })
};

module.exports = { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment };