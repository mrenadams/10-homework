const inquirer = require("inquirer");
const db = require("./db/db");
const { connection } = require("./db/db");
require("console.table");

askQuestions();

async function askQuestions() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    // Call the appropriate function depending on what the user chose
    switch (answer.choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        default:
            return quit();
    }
}

async function viewEmployees() {
    //get table
    const employees = await db.findAllEmployees(); //array of obj called row data packets

    //make pretty table
    console.table(employees);

    //asks the questions once more
    askQuestions();
}

async function addEmployee() {
    //get tables
    const employees = await db.findAllEmployees();
    const roles = await db.findAllRoles();

    //employee is a object with first and last name key value pairs
    const employee = await inquirer.prompt([
        {
            name: "first_name", //key in answers object
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    //creates a role choices array
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    console.log("*****roleChoices", roleChoices);

    const { roleId } = await inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    //add new role id key vlaue pair
    employee.role_id = roleId; // assign new employee role id

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    askQuestions();
}

async function viewRoles() {
    //get table
    const role = await db.findAllRoles(); //array of obj called row data packets

    //make pretty table
    console.table(role);

    //asks the questions once more
    askQuestions();
}

async function viewDepartments() {
    //get table
    const department = await db.findAllDepartments(); //array of obj called row data packets

    //make pretty table
    console.table(department);

    //asks the questions once more
    askQuestions();
}

async function updateEmployeeRole() {
    //get table
    const employees = await db.updateEmployeeRole(); //array of obj called row data packets

    //make pretty table
    console.table(employees);

    //asks the questions once more
    askQuestions();
}