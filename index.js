const db = require('./db/connection');
const inquirer = require('inquirer');

// response handling 
const { viewDepartments, viewRoles, viewEmployees, viewByManager, viewByDepartment } = require('./lib/viewFuncs');
const { addDepartment, addRole, addEmployee } = require('./lib/addFuncs');
const { updateRole, updateManager } = require('./lib/updateFuncs');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./lib/deleteFuncs');

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
    'EXIT': exitApp
}
const prompt = async () => {
    const answer = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: Object.keys(choicesObj)
    })
    if (answer) {
        choicesObj[answer.choice](); 
        setTimeout(function(){
            prompt(); // recursion after 2s
        }, 2000);
    }
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