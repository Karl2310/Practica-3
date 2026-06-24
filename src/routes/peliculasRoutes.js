const express = require('express')
const productosController = require('../controllers/peliculasConstroller')
const router = express.Router()



//GET /peliculas -> Devuelve la lista de películas

router.get('/', productosController.obtenerPeliculas)

//GET /peliculas/:id -> Devuelve una pelicula por su id
router.get('/:id', productosController.obtenerPeliculaPorId)

//POST /peliculas -> Agrega una nueva película a la lista
router.post('/', productosController.agregarPelicula)

 //PUT /peliculas/:id -> Actualiza una película existente
router.put('/:id', productosController.actualizarPelicula)

//DELETE /peliculas/:id -> Elimina una película de la lista
router.delete('/:id', productosController.eliminarPelicula)


module.exports = router