const db = require('../config/db')

// Función para obtener todas las películas
const obtenerTodos = async () => {
   const [rows] =  await db.query('SELECT * FROM peliculas');

   return rows;
}

const obtenerPorId = async (id) => {
    const [rows] = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
    return rows[0];
}

const crear = async (titulo, director, año) => {
    const [result] = await db.query(
        'INSERT INTO peliculas (titulo, director, año) VALUES (?, ?, ?)',
        [titulo, director, año]
    )
    const nuevaPelicula = {
        id: result.insertId,
        titulo,
        director,
        año
    }
    return nuevaPelicula;
}
  
const actualizar = async (id, titulo, director, año) => {
    const [result] = await db.query(
        'UPDATE peliculas SET titulo = ?, director = ?, año = ? WHERE id = ?',
        [titulo, director, año, id]
    )
    if (result.affectedRows === 0) {
        return undefined; // No se encontró la película para actualizar
    }
    const peliculaActualizada = {
        id,
        titulo,
        director,
        año
    }
    return peliculaActualizada;
}

const eliminar = async (id) => {
    const [result] = await db.query('DELETE FROM peliculas WHERE id = ?', [id]);

    return result.affectedRows; // Devuelve el número de filas afectadas
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
}           


