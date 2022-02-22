const db = require('./db/connection');
const prompt = require('./utils/prompt')
// response handling 

// connect to database 
db.connect(err => {
    if (err) throw err;
    console.log('Welcome to the employee-tracker!');
    // start the app 
    prompt();
});