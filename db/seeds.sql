-- DEPARTMENT SEEDS --
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS --
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Summer", "Smith", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Morty", "Smith", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Rick","Sanchez", 3 , null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jerry", "Smith", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Beth", "Smith", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Krombopulos", "Michael", 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Scary", "Terry", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Tiny", "Rick", 7, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bird", "Person", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Pickle", "Rick", 6, 2);