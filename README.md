# Employee-Tracker

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Description 
Node.js application that allows user to view departments, roles, employees, and total budget
User can add, update, and delete departments, roles, and employees

[DEMO](https://youtu.be/64j7wZE5RE8)

<img width="466" alt="Employee-tracker Screenshot" src="https://user-images.githubusercontent.com/91970214/155102989-f490e302-ded1-4600-960a-23c9855d563b.png">


## Installation 
1. Clone the repository
2. Go to app.js
3. Open terminal and run "npm init"
4. Run "npm i mysql2"
6. Run "npm i console.table --save"
7. Run "npm i inquirer"
8. Run "npm start"

## Important installation note
*there is a db/connection.js file not in this repo for security purposes, to test you will need to copy this code into your own db/connection.js file* 
```js
const mysql = require('mysql2');

// Connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'YOUR MYSQL PASSWORD HERE',
        database: 'employee'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;
```
To seed the databse with sample data run the following terminal commands
1) mysql2 -u root -p 
2) input your password
3) source db/schema.sql
4) source db/seeds.sql
5) quit;
