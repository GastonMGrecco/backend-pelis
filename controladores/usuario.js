const { Usuario } = require('../tablas/usuario');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AppError } = require('../utilidades/appError');

dotenv.config({ path: './config.env' });

exports.obtenerUsuarios = recibirAsinc(async (req, res, next) => {
  const usuarios = await Usuario.findAll({
    where: { status: 'activo' },
    attributes: { exclude: ['contrasena'] }
  });

  res.status(200).json({
    status: 'Operación Exitosa',
    data: { usuarios }
  });
});

exports.obtenerUsuarioUnico = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({
    where: { status: 'activo', id },
    attributes: { exclude: ['contrasena'] }
  });
  if (!usuario) {
    return next(
      new AppError(400, 'El usuario no pertenece a la base de datos')
    );
  }
  res.status(200).json({
    status: 'Operación exitosa',
    data: { usuario }
  });
});

exports.crearUsuario = recibirAsinc(async (req, res, next) => {
  const { nombre, email, contrasena, permisos } = req.body;
  if (!nombre || !email || !contrasena || !permisos) {
    return next(new AppError(400, 'Completar los campos vacíos'));
  }
  const salto = await bcrypt.genSalt(12);

  const contrasenaEncriptada = await bcrypt.hash(contrasena, salto);

  const nuevoUsuario = await Usuario.create({
    nombre,
    email,
    contrasena: contrasenaEncriptada,
    permisos
  });
  nuevoUsuario.contrasena = undefined;
  res.status(200).json({
    status: 'Operación exitosa',
    data: { nuevoUsuario }
  });
});

exports.ingresarUsuario = recibirAsinc(async (req, res, next) => {
  const { email, contrasena } = req.body;
  const usuario = await Usuario.findOne({ where: { email, status: 'activo' } });
  if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
    return next(AppError(400, 'E-mail o contraseña incorrectos'));
  }
  const token = await jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'Operación exitosa',
    data: { token }
  });
});

exports.modificarUsuario = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const { nombre, email, contraseña, permisos } = req.body;
  const usuarioModificado = {
    nombre,
    email,
    contraseña,
    permisos
  };

  const usuario = await Usuario.findOne({ where: { status: 'activo', id } });
  if (!usuario) {
    return next(
      new AppError(
        400,
        'El usuario no existe o ha sido eliminado de la base de datos'
      )
    );
  }
  await usuario.update({ ...usuarioModificado });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El usuario ha sido modificado exitosamente'
  });
});

exports.eliminarUsuario = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const usuarioAElimirar = await Usuario.findOne({
    where: { status: 'activo', id }
  });
  if (!usuarioAElimirar) {
    return next(new AppError(400, 'El usuario no existe o ha sido eliminado'));
  }
  await usuarioAElimirar.update({ status: 'eliminado' });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El usuario ha sido eliminado'
  });
});
