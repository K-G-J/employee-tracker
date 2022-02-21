const db = require('./db/connection');
const inquirer = require('inquirer');

// response handling 
const { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment } = require('./lib/viewFuncs');
const { addDepartment, addRole, addEmployee } = require('./lib/addFuncs');
const { updateRole, updateManager } = require('./lib/updateFuncs');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./lib/deleteFuncs');

function prompt() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees',
            'View employees by manager',
            'View employees by department', 
            'Add a department', 
            'Add a role',
            'Add an employee', 
            'Update an employee role',
            'Update employee manager',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'EXIT'
        ]
    }).then(answer => {
        switch (answer.choice) {
            case 'View all departments':
                new Promise(function (res) {
                    viewDepartments()
                    res(console.log('\n'), prompt())
                })
                break;
            case 'View all roles':
                new Promise(function (res) {
                    viewRoles()
                    res(prompt())
                })
                break;
            case 'View all employees':
                new Promise(function (res) {
                    viewEmployees()
                    res(prompt())
                })
                break;
            case 'View employees by manager':
                new Promise(function (res) {
                    viewByManager()
                    res(prompt());
                })
                break;
            case 'View employees by department':
                new Promise(function (res) {
                    viewByDepartment()
                    res(prompt());
                })
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Update an employee manager':
                updateManager();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'EXIT': 
                exitApp();
                break;
            default:
                break;
        }
    })
};
// connect to database 
db.connect(err => {
    if (err) throw err;
    console.log('Welcome to the employee-tracker!');
    // start the app 
    prompt();
});
// exit the app
function exitApp() {
    console.log('Thank you for using the employee-tracker!')
    db.end();
};