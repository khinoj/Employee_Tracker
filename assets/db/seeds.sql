INSERT INTO department (name)
VALUES ('IT'),
        ('SALES'),
        ('ACCOUTING'),
        ('Manager');

INSERT INTO role (title, salary, department_id)
VALUES ('Network Admin', '50000', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Darth', 'Vader', '1', '1');