const express = require('express');
const ruta = express.Router();
const {
  obtenerActores,
  obtenerActorUnico,
  crearActor,
  modificarActor,
  eliminarActor
} = require('../controladores/actor');

ruta.get('/', obtenerActores);

ruta.get('/:id', obtenerActorUnico);

ruta.post('/', crearActor);

ruta.patch('/:id', modificarActor);

ruta.delete('/:id', eliminarActor);

module.exports = { rutasActor: ruta };
