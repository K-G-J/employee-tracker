const db = require('../db/connection');
const inquirer = require('inquirer');

// response handling 
const { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment } = require('./viewFuncs');
const { addDepartment, addRole, addEmployee } = require('./addFuncs');
const { updateRole, updateManager } = require('./updateFuncs');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./deleteFuncs');

const choicesObj = {
    'View all departments': viewDepartments, 
    'View all roles': viewRoles, 
    'View all employees': viewEmployees,
    'View employees by manager': viewByManager,
    'View employees by department': viewByDepartment, 
    'Add a department': addDepartment, 
    'Add a role': addRole,
    'Add an employee': addEmployee, 
    'Update an employee role': updateRole,
    'Update employee manager': updateManager,
    'Delete a department': deleteDepartment,
    'Delete a role': deleteRole,
    'Delete an employee': deleteEmployee,
    'EXIT': function() {
        console.log('Thank you for using the employee-tracker!')
        db.end();
    }
}
function prompt() {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: Object.keys(choicesObj),
        }
    ]).then(answer => {
        choicesObj[answer.choice]();
        console.log('\n');
        return new Promise((resolve) => {
            resolve(inquirer.prompt([
                {
                    name: 'confirm',
                    type: 'confirm',
                    message: 'Would you like to continue?',
                    default: true
                }
            ]).then(response => {
                response.confirm ? prompt() : choicesObj['EXIT']();
            })
            )
        })
    })
};

module.exports = prompt;