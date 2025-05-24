INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 120000, 1),
    ('Lead Engineer', 150000, 1),
    ('Sales Manager', 100000, 2),
    ('Salesperson', 80000, 2),
    ('Accountant', 75000, 3),
    ('Legal Team Lead', 190000, 4),
    ('Lawyer', 160000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 2, NULL),
    ('Jane', 'Smith', 1, 1),
    ('Bob', 'Johnson', 3, NULL),
    ('Alice', 'Brown', 4, 3),
    ('Charlie', 'Wilson', 5, NULL),
    ('Sarah', 'Davis', 6, NULL),
    ('Mike', 'Miller', 7, 6);