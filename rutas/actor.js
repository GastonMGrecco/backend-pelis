const express = require('express');
const ruta = express.Router();
const {
  obtenerActores,
  crearActor,
  modificarActor,
  eliminarActor
} = require('../controladores/actor');

ruta.get('/', obtenerActores);

ruta.post('/', crearActor);

ruta.patch('/:id', modificarActor);

ruta.delete('/:id', eliminarActor);

module.exports = { rutasActor: ruta };
