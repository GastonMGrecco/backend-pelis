const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

const { Usuario } = require('../tablas/usuario');

const { AppError } = require('../utilidades/appError');
const { recibirAsinc } = require('../utilidades/recibirAsinc');

dotenv.config({ path: './config.env' });

exports.validarSesion = recibirAsinc(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(401, 'Sesión inválida'));
  }

  const tokenCodificado = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const usuario = await Usuario.findOne({
    where: { id: tokenCodificado.id, status: 'activo' },
    attributes: {
      exclude: ['contrasena']
    }
  });

  if (!usuario) {
    return next(new AppError(401, 'Sesión inválida'));
  }

  req.usuarioActual = usuario;

  next();
});

exports.usuarioAdministrador = recibirAsinc(async (req, res, next) => {
  if (req.usuarioActual.permisos !== 'administrador') {
    return next(new AppError(401, 'No cuentas con los permisos necesarios'));
  }
  next();
});
