const express = require('express');
const ruta = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioUnico,
  crearUsuario,
  ingresarUsuario,
  modificarUsuario,
  eliminarUsuario
} = require('../controladores/usuario');

ruta.get('/', obtenerUsuarios);

ruta.get('/:id', obtenerUsuarioUnico);

ruta.post('/', crearUsuario);

ruta.post('/ingreso', ingresarUsuario);

ruta.patch('/:id', modificarUsuario);

ruta.delete('/:id', eliminarUsuario);

module.exports = { rutasUsuario: ruta };
