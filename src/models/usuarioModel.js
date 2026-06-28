const db = require('../config/db')

const obtenerPorEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
}


const crearUsuario = async (nombre, email, password,rol = 'user') => {
    const [result] = await db.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)', [nombre, email, password, rol]);

    const usuario = {
        id: result.insertId,
        nombre,
        email
    };
    return usuario;
}

module.exports = {
    obtenerPorEmail,
    crearUsuario
}
