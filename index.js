// index.js
const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
const pool = require('./db/connection');

// Initialize classes
const department = new Department();
const role = new Role();
const employee = new Employee();

// ASCII art logo for visual appeal
const logo = `
 ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
 ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
 █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗
 ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝
 ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
 ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                        TRACKER CMS
`;

// Main menu options
const mainMenuOptions = [
    '👁️  View All Departments',
    '👁️  View All Roles',
    '👁️  View All Employees',
    '➕ Add a Department',
    '➕ Add a Role',
    '➕ Add an Employee',
    '🔄 Update Employee Role',
    '🔄 Update Employee Manager (Bonus)',
    '👥 View Employees by Manager (Bonus)',
    '🏢 View Employees by Department (Bonus)',
    '💰 View Department Budget (Bonus)',
    '🗑️  Delete Department (Bonus)',
    '🗑️  Delete Role (Bonus)',
    '🗑️  Delete Employee (Bonus)',
    '🚪 Exit'
];

// Main menu function
async function mainMenu() {
    try {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: mainMenuOptions,
            pageSize: 15
        });

        // Switch statement for menu actions
        switch (action) {
            case '👁️  View All Departments':
                await viewAllDepartments();
                break;
            case '👁️  View All Roles':
                await viewAllRoles();
                break;
            case '👁️  View All Employees':
                await viewAllEmployees();
                break;
            case '➕ Add a Department':
                await addDepartment();
                break;
            case '➕ Add a Role':
                await addRole();
                break;
            case '➕ Add an Employee':
                await addEmployee();
                break;
            case '🔄 Update Employee Role':
                await updateEmployeeRole();
                break;
            case '🔄 Update Employee Manager (Bonus)':
                await updateEmployeeManager();
                break;
            case '👥 View Employees by Manager (Bonus)':
                await viewEmployeesByManager();
                break;
            case '🏢 View Employees by Department (Bonus)':
                await viewEmployeesByDepartment();
                break;
            case '💰 View Department Budget (Bonus)':
                await viewDepartmentBudget();
                break;
            case '🗑️  Delete Department (Bonus)':
                await deleteDepartment();
                break;
            case '🗑️  Delete Role (Bonus)':
                await deleteRole();
                break;
            case '🗑️  Delete Employee (Bonus)':
                await deleteEmployee();
                break;
            case '🚪 Exit':
                console.log('\n👋 Goodbye! Thank you for using Employee Tracker CMS.\n');
                await pool.end();
                process.exit(0);
        }

        // Continue the menu loop
        mainMenu();
    } catch (error) {
        console.error('Error in main menu:', error);
        mainMenu();
    }
}

// View all departments
async function viewAllDepartments() {
    try {
        const departments = await department.viewAll();
        console.log('\n📋 All Departments:\n');
        console.table(departments);
    } catch (error) {
        console.error('Error viewing departments:', error);
    }
}

// View all roles
async function viewAllRoles() {
    try {
        const roles = await role.viewAll();
        console.log('\n📋 All Roles:\n');
        console.table(roles);
    } catch (error) {
        console.error('Error viewing roles:', error);
    }
}

// View all employees
async function viewAllEmployees() {
    try {
        const employees = await employee.viewAll();
        console.log('\n📋 All Employees:\n');
        console.table(employees);
    } catch (error) {
        console.error('Error viewing employees:', error);
    }
}

// Add a department
async function addDepartment() {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
            validate: input => input.trim() !== '' || 'Department name cannot be empty'
        });

        const newDept = await department.add(name);
        console.log(`\n✅ Department "${newDept.name}" added successfully!\n`);
    } catch (error) {
        console.error('Error adding department:', error);
    }
}

// Add a role
async function addRole() {
    try {
        // Get all departments for selection
        const departments = await department.viewAll();

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role:',
                validate: input => input.trim() !== '' || 'Role title cannot be empty'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for this role:',
                validate: input => !isNaN(input) && input > 0 || 'Please enter a valid salary'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for this role:',
                choices: departments.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }))
            }
        ]);

        const newRole = await role.add(answers.title, answers.salary, answers.departmentId);
        console.log(`\n✅ Role "${newRole.title}" added successfully!\n`);
    } catch (error) {
        console.error('Error adding role:', error);
    }
}

// Add an employee
async function addEmployee() {
    try {
        // Get all roles and employees for selection
        const roles = await role.viewAll();
        const employees = await employee.getAll();

        // Add "None" option for manager
        const managerChoices = [
            { name: 'None', value: null },
            ...employees.map(emp => ({
                name: emp.name,
                value: emp.id
            }))
        ];

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name:',
                validate: input => input.trim() !== '' || 'First name cannot be empty'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
                validate: input => input.trim() !== '' || 'Last name cannot be empty'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the employee\'s role:',
                choices: roles.map(role => ({
                    name: `${role.title} (${role.department})`,
                    value: role.id
                }))
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select the employee\'s manager:',
                choices: managerChoices
            }
        ]);

        const newEmployee = await employee.add(
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId
        );
        console.log(`\n✅ Employee "${answers.firstName} ${answers.lastName}" added successfully!\n`);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
}

// Update employee role
async function updateEmployeeRole() {
    try {
        // Get all employees and roles for selection
        const employees = await employee.getAll();
        const roles = await role.viewAll();

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employees.map(emp => ({
                    name: emp.name,
                    value: emp.id
                }))
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role:',
                choices: roles.map(role => ({
                    name: `${role.title} (${role.department})`,
                    value: role.id
                }))
            }
        ]);

        await employee.updateRole(answers.employeeId, answers.roleId);
        console.log(`\n✅ Employee role updated successfully!\n`);
    } catch (error) {
        console.error('Error updating employee role:', error);
    }
}

// Update employee manager (BONUS)
async function updateEmployeeManager() {
    try {
        const employees = await employee.getAll();

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employees.map(emp => ({
                    name: emp.name,
                    value: emp.id
                }))
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select the new manager:',
                choices: [
                    { name: 'None', value: null },
                    ...employees.map(emp => ({
                        name: emp.name,
                        value: emp.id
                    }))
                ]
            }
        ]);

        await employee.updateManager(answers.employeeId, answers.managerId);
        console.log(`\n✅ Employee manager updated successfully!\n`);
    } catch (error) {
        console.error('Error updating employee manager:', error);
    }
}

// View employees by manager (BONUS)
async function viewEmployeesByManager() {
    try {
        const managers = await employee.getManagers();

        const { managerId } = await inquirer.prompt({
            type: 'list',
            name: 'managerId',
            message: 'Select a manager to view their employees:',
            choices: managers.map(mgr => ({
                name: mgr.name,
                value: mgr.id
            }))
        });

        const employees = await employee.viewByManager(managerId);
        console.log(`\n📋 Employees managed by ${managers.find(m => m.id === managerId).name}:\n`);
        console.table(employees);
    } catch (error) {
        console.error('Error viewing employees by manager:', error);
    }
}

// View employees by department (BONUS)
async function viewEmployeesByDepartment() {
    try {
        const departments = await department.viewAll();

        const { departmentId } = await inquirer.prompt({
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view its employees:',
            choices: departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }))
        });

        const employees = await employee.viewByDepartment(departmentId);
        console.log(`\n📋 Employees in ${departments.find(d => d.id === departmentId).name} department:\n`);
        console.table(employees);
    } catch (error) {
        console.error('Error viewing employees by department:', error);
    }
}

// View department budget (BONUS)
async function viewDepartmentBudget() {
    try {
        const departments = await department.viewAll();

        const { departmentId } = await inquirer.prompt({
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view its budget:',
            choices: departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }))
        });

        const budget = await department.getBudget(departmentId);

        if (budget) {
            console.log(`\n💰 ${budget.department} Department Budget:\n`);
            console.log(`Total Utilized Budget: $${budget.total_budget.toLocaleString()}\n`);
        } else {
            console.log('\n⚠️  No employees in this department yet.\n');
        }
    } catch (error) {
        console.error('Error viewing department budget:', error);
    }
}

// Delete a department (BONUS)
async function deleteDepartment() {
    try {
        const departments = await department.viewAll();

        const { departmentId, confirm } = await inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select a department to delete:',
                choices: departments.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }))
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: '⚠️  This will delete all associated roles and employees. Are you sure?',
                default: false
            }
        ]);

        if (confirm) {
            const deleted = await department.delete(departmentId);
            console.log(`\n🗑️  Department "${deleted.name}" deleted successfully!\n`);
        } else {
            console.log('\n❌ Deletion cancelled.\n');
        }
    } catch (error) {
        console.error('Error deleting department:', error);
    }
}

// Delete a role (BONUS)
async function deleteRole() {
    try {
        const roles = await role.viewAll();

        const { roleId, confirm } = await inquirer.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select a role to delete:',
                choices: roles.map(r => ({
                    name: `${r.title} (${r.department})`,
                    value: r.id
                }))
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: '⚠️  This will affect all employees with this role. Are you sure?',
                default: false
            }
        ]);

        if (confirm) {
            const deleted = await role.delete(roleId);
            console.log(`\n🗑️  Role "${deleted.title}" deleted successfully!\n`);
        } else {
            console.log('\n❌ Deletion cancelled.\n');
        }
    } catch (error) {
        console.error('Error deleting role:', error);
    }
}

// Delete an employee (BONUS)
async function deleteEmployee() {
    try {
        const employees = await employee.getAll();

        const { employeeId, confirm } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select an employee to delete:',
                choices: employees.map(emp => ({
                    name: emp.name,
                    value: emp.id
                }))
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: '⚠️  Are you sure you want to delete this employee?',
                default: false
            }
        ]);

        if (confirm) {
            const deleted = await employee.delete(employeeId);
            console.log(`\n🗑️  Employee "${deleted.first_name} ${deleted.last_name}" deleted successfully!\n`);
        } else {
            console.log('\n❌ Deletion cancelled.\n');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
}

// Initialize the application
async function init() {
    console.log(logo);
    console.log('Welcome to the Employee Tracker CMS!\n');
    mainMenu();
}

// Start the application
init();