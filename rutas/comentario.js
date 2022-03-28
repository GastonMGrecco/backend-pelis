const express = require('express');
const ruta = express.Router();
const { validarSesion } = require('../utilidades/autSesion');
const {
  obtenerComentarios,
  obtenerComentarioUnico,
  crearComentario,
  modificarComentario,
  eliminarComentario
} = require('../controladores/comentario');

ruta.use(validarSesion);

ruta.post('/', crearComentario);

ruta.get('/', obtenerComentarios);

ruta.get('/:id', obtenerComentarioUnico);

ruta.patch('/:id', modificarComentario);

ruta.delete('/:id', eliminarComentario);

module.exports = { rutasComentario: ruta };
