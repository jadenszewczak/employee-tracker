const pool = require('../db/connection');

class Employee {
    // View all employees with complete information
    async viewAll() {
        const sql = `
            SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id
        `;
        try {
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            console.error('Error viewing employees:', err);
            throw err;
        }
    }

    // Add a new employee
    async add(firstName, lastName, roleId, managerId) {
        const sql = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        try {
            const result = await pool.query(sql, [firstName, lastName, roleId, managerId]);
            return result.rows[0];
        } catch (err) {
            console.error('Error adding employee:', err);
            throw err;
        }
    }

    // Update employee role
    async updateRole(employeeId, roleId) {
        const sql = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *
        `;
        try {
            const result = await pool.query(sql, [roleId, employeeId]);
            return result.rows[0];
        } catch (err) {
            console.error('Error updating employee role:', err);
            throw err;
        }
    }

    // Update employee manager (BONUS)
    async updateManager(employeeId, managerId) {
        const sql = `
            UPDATE employee
            SET manager_id = $1
            WHERE id = $2
            RETURNING *
        `;
        try {
            const result = await pool.query(sql, [managerId, employeeId]);
            return result.rows[0];
        } catch (err) {
            console.error('Error updating employee manager:', err);
            throw err;
        }
    }

    // View employees by manager (BONUS)
    async viewByManager(managerId) {
        const sql = `
            SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            WHERE e.manager_id = $1
            ORDER BY e.last_name, e.first_name
        `;
        try {
            const result = await pool.query(sql, [managerId]);
            return result.rows;
        } catch (err) {
            console.error('Error viewing employees by manager:', err);
            throw err;
        }
    }

    // View employees by department (BONUS)
    async viewByDepartment(departmentId) {
        const sql = `
            SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                r.salary
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE r.department_id = $1
            ORDER BY e.last_name, e.first_name
        `;
        try {
            const result = await pool.query(sql, [departmentId]);
            return result.rows;
        } catch (err) {
            console.error('Error viewing employees by department:', err);
            throw err;
        }
    }

    // Delete an employee (BONUS)
    async delete(id) {
        const sql = `DELETE FROM employee WHERE id = $1 RETURNING *`;
        try {
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting employee:', err);
            throw err;
        }
    }

    // Get all employees for selection lists
    async getAll() {
        const sql = `
            SELECT
                id,
                CONCAT(first_name, ' ', last_name) AS name
            FROM employee
            ORDER BY last_name, first_name
        `;
        try {
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            console.error('Error getting all employees:', err);
            throw err;
        }
    }

    // Get all managers for selection lists
    async getManagers() {
        const sql = `
            SELECT DISTINCT
                e.id,
                CONCAT(e.first_name, ' ', e.last_name) AS name
            FROM employee e
            JOIN employee sub ON e.id = sub.manager_id
            ORDER BY name
        `;
        try {
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            console.error('Error getting managers:', err);
            throw err;
        }
    }
}

module.exports = Employee;