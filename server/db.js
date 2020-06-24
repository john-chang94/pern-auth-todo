const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'zenbook524',
    host: 'localhost',
    port: 5432,
    database: 'authtodolist'
})

module.exports = pool;