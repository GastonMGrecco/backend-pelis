const { body, validationResult } = require('express-validator');

const { AppError } = require('./appError');
const { recibirAsinc } = require('./recibirAsinc');

exports.crearActorV = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('nacionalidad')
    .isString()
    .withMessage('La nacionalidad debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('genero')
    .isString()
    .withMessage('El genero debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('edad')
    .isNumeric()
    .withMessage('La edad debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0')
];
exports.modificarActorV = [
  body('nombre').isString().withMessage('El nombre debe ser un String'),
  body('nacionalidad')
    .isString()
    .withMessage('La nacionalidad debe ser un String'),
  body('genero').isString().withMessage('El genero debe ser un String'),
  body('edad')
    .isNumeric()
    .withMessage('La edad debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0')
];
exports.creaPeliculaV = [
  body('titulo')
    .isString()
    .withMessage('El titulo debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('resena')
    .isString()
    .withMessage('La reseña debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('genero')
    .isString()
    .withMessage('El genero debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('puntuacion')
    .isNumeric()
    .withMessage('La puntuacion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La puntuacion debe ser mayor de 0'),
  body('duracion')
    .isNumeric()
    .withMessage('La duracion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La duracion debe ser mayor de 0')
];
exports.modificarPeliculaV = [
  body('titulo').isString().withMessage('El titulo debe ser un String'),
  body('resena').isString().withMessage('La reseña debe ser un String'),
  body('genero').isString().withMessage('El genero debe ser un String'),
  body('puntuacion')
    .isNumeric()
    .withMessage('La puntuacion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La puntuacion debe ser mayor de 0'),
  body('duracion')
    .isNumeric()
    .withMessage('La duracion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La duracion debe ser mayor de 0')
];
exports.creaComentarioV = [
  body('titlulo')
    .isString()
    .withMessage('El titulo debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('comentario')
    .isString()
    .withMessage('El comentario debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('puntuacion')
    .isNumeric()
    .withMessage('La puntuacion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0'),
  body('peliculaId')
    .isNumeric()
    .withMessage('La peliculaId debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0')
];
exports.modificarComentarioV = [
  body('titlulo').isString().withMessage('El titulo debe ser un String'),
  body('comentario').isString().withMessage('El comentario debe ser un String'),
  body('puntuacion')
    .isNumeric()
    .withMessage('La puntuacion debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0')
];
exports.creaUsuarioV = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('email')
    .isString()
    .withMessage('El email debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('contrasena')
    .isString()
    .withMessage('La contrasena debe ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío'),
  body('permisos')
    .isString()
    .withMessage('Los permisos deben ser un String')
    .notEmpty()
    .withMessage('No puedes enviar un campo vacío')
];
exports.modificarUsuarioV = [
  body('nombre').isString().withMessage('El nombre debe ser un String'),
  body('email').isString().withMessage('El email debe ser un String'),
  body('contrasena').isString().withMessage('La contrasena debe ser un String'),
  body('permisos').isString().withMessage('Los permisos deben ser un String')
];
exports.crearActorEnPeliV = [
  body('actorId')
    .isNumeric()
    .withMessage('actorId debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0'),
  body('peliculaId')
    .isNumeric()
    .withMessage('peliculaId debe ser un numero')
    .custom((value) => value > 0)
    .withMessage('La edad debe ser mayor de 0')
];

exports.validacionesResult = recibirAsinc(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  next();
});
