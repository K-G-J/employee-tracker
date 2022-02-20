const db = require('./db/connection');
const inquirer = requier('inquirer');
const cTable = require('console.table');

db.connect(err => {
    if (err) throw err;
    console.log('Welcome to the employee-tracker!');
});

// You might also want to make your queries asynchronous. 
// MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. 
// To learn more and make your queries asynchronous, 
// refer to the npm documentation on MySQL2.