module.exports = { deleteDepartment, deleteRole, deleteEmployee };

const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const prompt = require('./prompt');
const { getRoles } = require('./addFuncs');

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
                setTimeout(function() {
                    prompt();
                }, 2000);
            })
        )
    });
};
//delete a role
function deleteRole() {
        inquirer.prompt([
            {
                name: 'role_id',
                type: 'input',
                message: function(){
                    console.log("\nWhat is the ID number of the role you would like to delete?\n")
                    getRoles();
                }
            }
        ]).then(answer => {
            db.promise().query('DELETE FROM role WHERE id = ?', answer.role_id, (err) => {
                if (err) throw err;
                console.log("Role deleted!")
        }).then(
            db.query('SELECT * FROM role', (err, res) => {
                if (err) throw err;
                console.table('\nAll Roles:', res)
                setTimeout(function() {
                    prompt();
                }, 2000);
            })
        )
    })
}
// delete an employee 
function deleteEmployee() {
    db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err; 
    const employees = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, id: id }));
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
                    setTimeout(function() {
                        prompt();
                    }, 2000);
                })
            )
        })
    });
}