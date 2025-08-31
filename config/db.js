import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    timezone: '-06:00',
    charset: 'utf8mb4'
});

export default pool;