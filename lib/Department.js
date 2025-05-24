const pool = require('../db/connection');

class Department {
    // View all departments
    async viewAll() {
        const sql = `SELECT id, name FROM department ORDER BY id`;
        try {
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            console.error('Error viewing departments:', err);
            throw err;
        }
    }

    // Add a new department
    async add(name) {
        const sql = `INSERT INTO department (name) VALUES ($1) RETURNING *`;
        try {
            const result = await pool.query(sql, [name]);
            return result.rows[0];
        } catch (err) {
            console.error('Error adding department:', err);
            throw err;
        }
    }

    // Delete a department (BONUS)
    async delete(id) {
        const sql = `DELETE FROM department WHERE id = $1 RETURNING *`;
        try {
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting department:', err);
            throw err;
        }
    }

    // Get department budget (BONUS)
    async getBudget(id) {
        const sql = `
            SELECT
                d.name AS department,
                SUM(r.salary) AS total_budget
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            WHERE d.id = $1
            GROUP BY d.id, d.name
        `;
        try {
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            console.error('Error getting department budget:', err);
            throw err;
        }
    }
}

module.exports = Department;