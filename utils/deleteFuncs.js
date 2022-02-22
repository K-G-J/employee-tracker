module.exports = { deleteDepartment, deleteRole, deleteEmployee };

const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const prompt = require('./prompt');
const { getRoles } = require('./addFuncs');

// delete a department 
function deleteDepartment() {
        db.query('SELECT * FROM department', (err, res) => {
            if (err) throw err; 
            const departments = res.map(({ name, id }) => ({ name: name, value: id }));
            inquirer.prompt([
                {
                    name: 'dept',
                    type: 'list',
                    message: 'Which department would you like to delete?',
                    choices: departments
                }
            ]).then(answer => {
                db.query('DELETE FROM department WHERE id = ?', answer.dept, (err) => {
                    if (err) throw err;
                    console.log('Department deleted!')
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
    })
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
            db.query('DELETE FROM role WHERE id = ?', answer.role_id, (err) => {
                if (err) throw err;
                console.log("Role deleted!")
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
                db.query('DELETE FROM employee WHERE id = ?', empChoice.name, (err) => {
                if (err) throw err;
                console.log("Successfully deleted!");
                setTimeout(function() {
                    db.query('SELECT * FROM employee', (err, res) => {
                        if (err) throw err;
                        console.table('\nAll Employees:', res)
                        setTimeout(function() {
                            prompt();
                        }, 3000);
                    })
                }, 2000)
            })
        })
    });
}