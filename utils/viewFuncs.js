module.exports = { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment };

const db = require('../db/connection');
const prompt = require('./prompt');
const { getManagers } = require('./addFuncs');

// view all departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('\nAll Departments:', res);
        setTimeout(function() {
            prompt();
        }, 2000);
    })
};
// view all roles 
function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('\nAll Roles:', res);
        setTimeout(function() {
            prompt();
        }, 2000);
    })
};
// view all employees
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table('\nAll Employees:', res);
        setTimeout(function() {
            prompt();
        }, 2000);
    })
};
// view employees by manager 
function viewByManager() {
    getManagers();
    const sql = `SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee ORDER BY employee.manager_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('\nEmployees by Manager:', res);
        setTimeout(function() {
            prompt();
        }, 2000);
    })
};
// view employees by department 
function viewByDepartment() {
    const sql = `SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY employee.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('\nEmployees by Department:', res);
        setTimeout(function() {
            prompt();
        }, 2000);
    })
};

