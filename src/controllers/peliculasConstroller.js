const peliculasModel = require("../models/peliculasModel");

const obtenerPeliculas = async (req, res) => {
  const peliculas = await peliculasModel.obtenerTodos();
  res.json(peliculas);
};

const obtenerPeliculaPorId = async (req, res) => {
  const id = parseInt(req.params.id);

  const pelicula = await peliculasModel.obtenerPorId(id);

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.json(pelicula);
};

const agregarPelicula = async (req, res) => {
  const { titulo, director, año } = req.body;

  if (!titulo || !director || !año) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const nuevaPelicula = await peliculasModel.crear(titulo, director, año);
  
  res.status(201).json(nuevaPelicula);
};

const actualizarPelicula = async (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, director, año } = req.body;

  if (!titulo || !director || !año) {
    return res.status(400).json({ error: "Datos incorrectos" });
  }

  const pelicula = await peliculasModel.actualizar(id, titulo, director, año);

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.json({
    mensaje: "Película actualizada",
    pelicula,
  });
};

const eliminarPelicula = async (req, res) => {
  const id = parseInt(req.params.id);

  const eliminada = await peliculasModel.eliminar(id);

  if (eliminada === 0) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.json({ mensaje: "Película eliminada" });
};

module.exports = {
  obtenerPeliculas,
  obtenerPeliculaPorId,
  agregarPelicula,
  actualizarPelicula,
  eliminarPelicula,
};
