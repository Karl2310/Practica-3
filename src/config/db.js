const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'databasePeliculas',
  port: 3306, // Puerto por defecto de MySQL
  password: '',
});

module.exports = pool;

