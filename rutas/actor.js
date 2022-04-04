const express = require('express');
const ruta = express.Router();
const { validarSesion } = require('../utilidades/autSesion');
const { usuarioAdministrador } = require('../utilidades/autSesion');
const {
  crearActorV,
  validacionesResult,
  modificarActorV
} = require('../utilidades/validaciones');
const {
  obtenerActores,
  obtenerActorUnico,
  crearActor,
  modificarActor,
  eliminarActor
} = require('../controladores/actor');
const { imagenCargada } = require('../utilidades/multer');

ruta.get('/', obtenerActores);

ruta.get('/:id', obtenerActorUnico);

ruta.use(validarSesion);

ruta.use(usuarioAdministrador);

ruta.post(
  '/',
  crearActorV,
  validacionesResult,
  imagenCargada.single('imagen'),
  crearActor
);

ruta.patch(
  '/:id',
  modificarActorV,
  validacionesResult,
  imagenCargada.single('imagen'),
  modificarActor
);

ruta.delete('/:id', eliminarActor);

module.exports = { rutasActor: ruta };
