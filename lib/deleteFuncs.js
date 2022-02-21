const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { getRoles } = require('./addFuncs')

// delete a department 
function deleteDepartment() {
        inquirer.prompt([
            {
                name: 'dept',
                type: 'list',
                message: 'Which department would you like to delete?',
                choices: function() {
                    departmentsArr = [];
                    db.query('SELECT * FROM department', (err, res) => {
                        if (err) throw err;
                        for (var d of res) {
                            departmentsArr.push(d.name)
                        }
                    })
                    return departmentsArr;
                }
            }
        ]).then(answer => {
            db.promise().query('DELETE FROM department WHERE name = ?', answer.dept, (err) => {
                if (err) throw err;
                console.log('Department deleted!')
        }).then(
            db.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                console.table('\nAll Departments:', res)
            })
        )
    });
};
//delete a role
function deleteRole() {
    roleArr = getRoles();
        inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                message: 'Which role would you like to delete?',
                choices: roleArr
            }
        ]).then(answer => {
            db.promise().query('DELETE FROM role WHERE title = ?', answer.role, (err) => {
                if (err) throw err;
                console.log("Role deleted!")
        }).then(
            db.query('SELECT * FROM role', (err, res) => {
                if (err) throw err;
                console.table('\nAll Roles:', res)
            })
        )
    })
}
// delete an employee 
function deleteEmployee() {
    db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err; 
    const employees = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: "Which employee would you like to delete?",
            choices: employees
        }
        ]).then(empChoice => {
            connection.query('DELETE FROM employee WHERE id = ?', empChoice.name, (err) => {
                if (err) throw err;
                console.log("Successfully deleted!");
            }).then(
                db.query('SELECT * FROM employee', (err, res) => {
                    if (err) throw err;
                    console.table('\nAll Employees:', res)
                })
            )
        })
    });
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };