const express = require('express');
const ruta = express.Router();
const { validarSesion } = require('../utilidades/autSesion');
const { usuarioAdministrador } = require('../utilidades/autSesion');
const {
  obtenerPeliculas,
  obtenerPeliculaUnica,
  crearPelicula,
  modificarPelicula,
  eliminarPelicula
} = require('../controladores/pelicula');
const { imagenCargada } = require('../utilidades/multer');

ruta.use(validarSesion);

ruta.get('/', obtenerPeliculas);

ruta.get('/:id', obtenerPeliculaUnica);

ruta.use(usuarioAdministrador);

ruta.post('/', imagenCargada.single('imagen'), crearPelicula);

ruta.patch('/:id', imagenCargada.single('imagen'), modificarPelicula);

ruta.delete('/:id', eliminarPelicula);

module.exports = { rutasPelicula: ruta };
