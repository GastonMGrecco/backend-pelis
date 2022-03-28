const express = require('express');
const ruta = express.Router();
const { validarSesion } = require('../utilidades/autSesion');
const {usuarioAdministrador}= require('../utilidades/autSesion');
const {
  obtenerActorEnPelis,
  crearActorEnPeli,
  modificarActorEnPeli,
  eliminarActorEnPeli
} = require('../controladores/actorEnPelis');

ruta.use(validarSesion);

ruta.use(usuarioAdministrador);

ruta.get('/', obtenerActorEnPelis);

ruta.post('/', crearActorEnPeli);

ruta.patch('/:id', modificarActorEnPeli);

ruta.delete('/:id', eliminarActorEnPeli);

module.exports = { rutasActorEnPeli: ruta };