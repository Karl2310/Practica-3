const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;

