const express = require('express');
const ruta = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario
} = require('../controladores/usuario');

ruta.get('/', obtenerUsuarios);

ruta.post('/', crearUsuario);

ruta.patch('/:id', modificarUsuario);

ruta.delete('/:id', eliminarUsuario);

module.exports = { rutasUsuario: ruta };
