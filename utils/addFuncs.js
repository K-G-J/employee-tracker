module.exports = { addDepartment, addRole, addEmployee, getRoles, getManagers };

const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const prompt = require('./prompt');

// get roles for adding employee
function getRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        const roles = res.map(({ id, title }) => ({ title: title, id: id }))
        return console.table('\nRole IDs:', roles);
    });
};
// get managers for adding employee
function getManagers() {
    db.query('SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err;
        const managers = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, id: id }))
        return console.table('\nManager IDs', managers);
    });
};

// add a department 
function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the department name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name");
                    return false;
                }
            }
        }
    ]).then(answer => {
            db.query('INSERT INTO department SET ?', { name: answer.name }, (err) => {
                if (err) throw err;
                console.log('Department added!')
                setTimeout(function() {
                    db.query('SELECT * FROM department', (err, res) => {
                    if (err) throw err;
                    console.table('\nAll Departments:', res)
                    setTimeout(function() {
                        prompt();
                    }, 3000);
                })
            }, 2000)
        })
    });
};
// add a role 
function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the role title?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter the role title");
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: "What is the role's salary?"
        }
    ]).then(answers => {
            db.query('INSERT INTO role SET?', { title: answers.title, salary: answers.salary }, (err) => {
                if (err) throw err;
                console.log('Role added!')
                setTimeout(function() {
                    db.query('SELECT * FROM role', (err, res) => {
                    if (err) throw err;
                    console.table('\nAll Roles:', res)
                    setTimeout(function() {
                        prompt();
                    }, 3000);
                })
            }, 2000)
        })
    });
};
// add an employee
function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input', 
            message: "What is the employee's fist name? ",
            validate: first_nameInput => {
                if (first_nameInput) {
                    return true;
                } else {
                    console.log("Please enter employee's first name");
                    return false;
                }
            }
        },
        {
            name: 'last_name',
            type: 'input', 
            message: "What is the employee's last name? ",
            validate: last_nameInput => {
                if (last_nameInput) {
                    return true;
                } else {
                    console.log("Please enter employee's last name");
                    return false;
                }
            }
        },
        {
            name: 'role_id', 
            type: 'input',
            message: function(){
                console.log("\nWhat is employee's role ID number?\n")
                getRoles();
            }
        },
        {
            name: 'manager_id',
            type: 'input', 
            message: function(){
                console.log("\nWhat is the employee's manager ID number? Leave blank or input NULL if manager.\n")
                getManagers();
            }
        },
    ])
    .then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
        db.query(sql, params, (err) => {
            if (err) throw err;
            console.log('Your employee has been added!');
            console.table(answers);
            setTimeout(function() {
                prompt();
            }, 2000);
        })
    })
}
