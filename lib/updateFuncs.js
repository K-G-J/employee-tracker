const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const { getRoles, getManagers } = require('./addFuncs')

// update and employee's role
function updateRole() {
    db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res)
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'list',
                message: "Select the employee's first name",
                choices: function() {
                    firstNames = [];
                    for (var e of res) {
                        firstNames.push(e.first_name)
                    }
                    return firstNames;
                }
            },
            {
                name: 'last_name',
                type: 'list',
                message: "Select the employee's last name",
                choices: function() {
                    lastNames = [];
                    for (var e of res) {
                        firstNames.push(e.last_name)
                    }
                    return lastNames;
                }
            },
            {
                name: 'role',
                type: 'list',
                message: "What is the employee's new role?",
                choices: getRoles()
            }
        ]).then(answers => {
            var roleId = getRoles().indexOf(answers.role) + 1
            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
            const params = [roleId, answers.first_name, answers.last_name]
            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log("Employee role updated!");
                console.table(answers);
                prompt();
            })
        })
    });
}
// update and employee's manager 
function updateManager() {
    db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res)
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'list',
                message: "Select the employee's first name",
                choices: function() {
                    firstNames = [];
                    for (var e of res) {
                        firstNames.push(e.first_name)
                    }
                    return firstNames;
                }
            },
            {
                name: 'last_name',
                type: 'list',
                message: "Select the employee's last name",
                choices: function() {
                    lastNames = [];
                    for (var e of res) {
                        firstNames.push(e.last_name)
                    }
                    return lastNames;
                }
            },
            {
                name: 'manager_name',
                type: 'list',
                message: "Who is the employee's new manager?",
                choices: getManagers()
            }
        ]).then(answers => {
            var managerId = getManagers().indexOf(answers.manager_name) + 1
            const sql = `UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`;
            const params = [managerId, answers.first_name, answers.last_name]
            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log("Employee manager updated!");
                console.table(answers);
                prompt();
            })
        })
    });
}

module.exports = { updateRole, updateManager };