const pool = require('../db/connection');

class Role {
    // View all roles with department info
    async viewAll() {
        const sql = `
            SELECT
                r.id,
                r.title,
                r.salary,
                d.name AS department
            FROM role r
            JOIN department d ON r.department_id = d.id
            ORDER BY r.id
        `;
        try {
            const result = await pool.query(sql);
            return result.rows;
        } catch (err) {
            console.error('Error viewing roles:', err);
            throw err;
        }
    }

    // Add a new role
    async add(title, salary, departmentId) {
        const sql = `
            INSERT INTO role (title, salary, department_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        try {
            const result = await pool.query(sql, [title, salary, departmentId]);
            return result.rows[0];
        } catch (err) {
            console.error('Error adding role:', err);
            throw err;
        }
    }

    // Delete a role (BONUS)
    async delete(id) {
        const sql = `DELETE FROM role WHERE id = $1 RETURNING *`;
        try {
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting role:', err);
            throw err;
        }
    }
}

module.exports = Role;