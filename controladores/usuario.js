const { Usuario } = require('../tablas/usuario');
const { recibirAsinc } = require('../utilidades/recibirAsinc');

exports.obtenerUsuarios = recibirAsinc(async (req, res, next) => {});

exports.crearUsuario = recibirAsinc(async (req, res, next) => {});

exports.modificarUsuario = recibirAsinc(async (req, res, next) => {});

exports.eliminarUsuario = recibirAsinc(async (req, res, next) => {});
