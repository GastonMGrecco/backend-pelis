const express = require('express');
const ruta = express.Router();
const {
  obtenerPeliculas,
  crearPelicula,
  modificarPelicula,
  eliminarPelicula
} = require('../controladores/pelicula');

ruta.get('/', obtenerPeliculas);

ruta.post('/', crearPelicula);

ruta.patch('/:id', modificarPelicula);

ruta.delete('/:id', eliminarPelicula);

module.exports = { rutasPelicula: ruta };
