# Employee Tracker CMS

A comprehensive command-line content management system for managing company employee data

## 📹 Walkthrough Video

### [👉 Click here to watch the full application demonstration](https://youtu.be/I3z0aqMuSqY)

This video demonstrates:

- Starting the application from command line
- Viewing all departments, roles, and employees with formatted tables
- Adding new departments, roles, and employees with validation
- Updating employee roles and managers
- All bonus features including:
  - Viewing employees by manager and department
  - Deleting departments, roles, and employees with confirmations
  - Calculating total utilized budget by department

## Description

Employee Tracker CMS is a Node.js command-line application that allows business owners and HR departments to view and manage their company's departments, roles, and employees. Built with Node.js, Inquirer, and PostgreSQL, this application provides a user-friendly interface for complex database operations.

## Features

### Core Features ✅

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Formatted table display with comprehensive information

### Bonus Features (All Implemented) 🌟

- Update employee managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees (with cascade handling)
- View total utilized budget by department

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Features Demo](#features-demo)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation

To install and run this application locally, follow these steps:

1. **Prerequisites**

   - Node.js (v12 or higher)
   - PostgreSQL (v12 or higher)
   - Git

2. **Clone the repository**

   ```bash
   git clone https://github.com/jadenszewczak/employee-tracker.git
   cd employee-tracker
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up PostgreSQL database**

   - Make sure PostgreSQL is running on your system
   - Create a new database:

   ```bash
   psql -U postgres
   CREATE DATABASE employee_tracker_db;
   \q
   ```

5. **Configure database connection**

   - Create a `.env` file in the root directory:

   DB_NAME='employee_tracker_db'
   DB_USER='your_postgresql_username'
   DB_PASSWORD='your_postgresql_password'

6. **Initialize the database**
   npm run init-db
   This will create the tables and seed them with sample data.

## Usage

1. **Start the application**

   ```bash
   npm start
   ```

2. **Navigate the menu**
   Use arrow keys to select options and press Enter to confirm:

   **Main Menu Options:**

   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role
   - Update employee manager
   - View employees by manager
   - View employees by department
   - Delete department/role/employee
   - View department budget
   - Exit

3. **Example Workflows**

   **Adding a New Employee:**

   1. Select "Add an employee" from main menu
   2. Enter first name: John
   3. Enter last name: Doe
   4. Select role from list: Software Engineer
   5. Select manager from list: Jane Smith
   6. Employee added successfully!

   **Viewing Department Budget:**

   1. Select "View total utilized budget of a department"
   2. Select department: Engineering
   3. View total salaries for all employees in Engineering

## Database Schema

The application uses the following database structure:

```sql
-- Department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
```

## Technologies Used

- **Node.js** - JavaScript runtime environment
- **Inquirer v8.2.4** - Command-line interface for user prompts
- **PostgreSQL** - Relational database management system
- **pg (node-postgres)** - PostgreSQL client for Node.js
- **console.table** - Formats data into readable tables
- **dotenv** - Environment variable management
- **chalk** - Terminal string styling

## Features Demo

### View All Employees

Displays a comprehensive table showing:

- Employee ID
- Full Name
- Job Title
- Department
- Salary
- Manager Name

### Add Department

- Validates unique department names
- Prevents duplicate entries
- Confirms successful addition

### Update Employee Role

- Shows current role
- Lists all available roles
- Updates with confirmation

### Delete Operations

- Cascading delete warnings
- Confirmation prompts
- Success/error feedback

### Budget Calculation

- Real-time salary summation
- Department-wise breakdown
- Currency formatting

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Questions

For questions or issues, please contact:

- GitHub: [jadenszewczak](https://github.com/jadenszewczak)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

**Note:** This project was created as part of the Columbia University Full-Stack Web Development Bootcamp.
