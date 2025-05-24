# Employee Tracker CMS

A comprehensive command-line content management system for managing company employee data

## Description

Employee Tracker CMS is a Node.js command-line application that allows business owners and HR departments to view and manage their company's departments, roles, and employees. Built with Node.js, Inquirer, and PostgreSQL, this application provides a user-friendly interface for complex database operations.

## Features

### Core Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Formatted data display with comprehensive information

### Bonus Features (All Implemented)

- Update employee managers
- View employees by manager
- View employees by department
- Delete departments, roles, and employees
- View total utilized budget by department

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

1. Clone the repository:
   git clone
   cd employee-tracker

Install dependencies:
bashnpm install

Create the database:
bashpsql -U postgres
\i db/schema.sql
\i db/seeds.sql
\q

Update database connection in db/connection.js with your PostgreSQL credentials

## Usage

Start the application:
bashnpm start
Navigate through the menu using arrow keys and follow the prompts to:

View departments, roles, and employees
Add new entries to the database
Update existing employee information
Delete records (with confirmation)
View department budgets

## Database Schema

sqldepartment
├── id: SERIAL PRIMARY KEY
└── name: VARCHAR(30) UNIQUE NOT NULL

role
├── id: SERIAL PRIMARY KEY
├── title: VARCHAR(30) UNIQUE NOT NULL
├── salary: DECIMAL NOT NULL
└── department_id: INTEGER NOT NULL (FK)

employee
├── id: SERIAL PRIMARY KEY
├── first_name: VARCHAR(30) NOT NULL
├── last_name: VARCHAR(30) NOT NULL
├── role_id: INTEGER NOT NULL (FK)
└── manager_id: INTEGER (FK, self-referencing)

## Technologies Used

Node.js - JavaScript runtime
Inquirer v8.2.4 - Interactive CLI prompts
PostgreSQL - Relational database
pg - PostgreSQL client for Node.js

## Walkthrough Video

Click here to view the walkthrough video
The video demonstrates:

Starting the application from the command line
All menu options functioning correctly
Complete CRUD operations
All bonus features implemented
Proper data validation and error handling

## Contributing

Fork the repository
Create a feature branch (git checkout -b feature/NewFeature)
Commit your changes (git commit -m 'Add NewFeature')
Push to the branch (git push origin feature/NewFeature)
Open a Pull Request

## Questions

For questions about this project, please contact:

GitHub: jadenszewczak

## License

This project is licensed under the MIT License.
