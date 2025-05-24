const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'employee_db',
    port: 5432,
});

// Test the connection
pool.connect()
    .then(() => console.log('Connected to the employee_db database ✅'))
    .catch(err => console.error('Connection error 🔴', err.stack));

module.exports = pool;