const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// get roles for adding employee
function getRoles() {
    roleArray = [];
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        for (var r of res) {
            roleArray.push(r.title)
        }
    })
    return roleArray;
}
// get managers for adding employee
function getManagers() {
    managersArr = [];
    // if manager_id is NULL, then employee is a manager 
    db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err;
        for (var e of res) {
            managersArr.push(`${e.first_name} ${e.last_name}`)
        }
    })
    return managersArr;
}

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
    ]).then(answers => {
        db.query('INSERT INTO department SET?', {
            name: answers.name
        }).then(function() {
            return db.query('SELECT * FROM department');
        }).spread(function (res) {
            console.table('All Departments:', res);
        });
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
        db.query('INSERT INTO role SET?', {
            title: answers.title,
            salary: answers.salary
        }).then(function() {
            return db.query('SELECT * FROM role');
        }).spread(function (res) {
            console.table('All Roles:', res);
        });
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
            name: 'role', 
            type: 'list',
            message: "What is this employee's role?",
            choices: getRoles()
        },
        {
            name: 'manager_name',
            type: 'rawlist', 
            message: "What is the employee's manager name? ",
            choices: getManagers()
        },
    ])
    .then(answers => {
        const roleId = getRoles().indexOf(answers.role) + 1 
        const managerId = getManagers().indexOf(answers.manger_name) + 1 
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answers.first_name, answers.last_name, roleId, managerId];
        db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log('Your employee has been added!');
            console.table(answers);
            prompt();
        })
    })
}
module.exports = { addDepartment, addRole, addEmployee };
