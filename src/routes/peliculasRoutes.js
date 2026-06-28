const express = require('express')
const productosController = require('../controllers/peliculasConstroller')
const verificarToken = require('../middleware/authMiddleware')
const verificarRol = require('../middleware/roleMiddleware')

const router = express.Router()


//GET /peliculas -> Devuelve la lista de películas

router.get('/', productosController.obtenerPeliculas)

//GET /peliculas/:id -> Devuelve una pelicula por su id
router.get('/:id', verificarToken, productosController.obtenerPeliculaPorId)

//POST /peliculas -> Agrega una nueva película a la lista
router.post('/', verificarToken, verificarRol('admin',), productosController.agregarPelicula)

 //PUT /peliculas/:id -> Actualiza una película existente
router.put('/:id',verificarToken, verificarRol('admin'), productosController.actualizarPelicula)

//DELETE /peliculas/:id -> Elimina una película de la lista
router.delete('/:id', verificarToken, verificarRol('admin'), productosController.eliminarPelicula)


module.exports = router