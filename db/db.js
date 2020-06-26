const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //query methods
    findAllEmployees() {
        return this.connection.query(
            //sql query added
            `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name)

            AS manager FROM employee

            LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id;
            `
        );
    }

    findAllRoles() {
        return this.connection.query(
            //sql query added
            `
            SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;

            `
        );
    }

    createEmployee(employee) {
        return this.connection.query(
            `INSERT INTO employee SET ?`,
            employee
        )
    }

    findAllDepartments() {
        return this.connection.query(
            //sql query added
            `
            SELECT department.id, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;

            `
        );
    }

    // Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // Remove an employee with the given id
    removeEmployee(employeeId) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

}

module.exports = new DB(connection);