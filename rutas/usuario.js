const express = require('express');
const { validarSesion } = require('../utilidades/autSesion');
const {usuarioAdministrador}= require('../utilidades/autSesion');
const ruta = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioUnico,
  crearUsuario,
  ingresarUsuario,
  modificarUsuario,
  eliminarUsuario
} = require('../controladores/usuario');

ruta.post('/', crearUsuario);

ruta.post('/ingreso', ingresarUsuario);

ruta.use(validarSesion);

ruta.get('/', obtenerUsuarios);

ruta.get('/:id', obtenerUsuarioUnico);

ruta.patch('/:id', modificarUsuario);

ruta.use(usuarioAdministrador);

ruta.delete('/:id', eliminarUsuario);

module.exports = { rutasUsuario: ruta };
