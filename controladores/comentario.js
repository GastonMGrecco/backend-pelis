const { Comentario } = require('../tablas/comentario');
const { Pelicula } = require('../tablas/pelicula');
const { Usuario } = require('../tablas/usuario');
const { ActorEnPeli } = require('../tablas/actorEnPeli');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utilidades/firebase');

exports.obtenerComentarios = recibirAsinc(async (req, res, next) => {
  const comentarios = await Comentario.findAll({
    where: { status: 'activo' },
    include: [{ model: Pelicula, through: ActorEnPeli }, { model: Usuario }]
  });
  res.status(200).json({
    status: 'operación exitosa',
    data: comentarios
  });
});

exports.obtenerComentarioUnico = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const comentarioUnico = await Comentario.findOne({
    where: { status: 'activo', id },
    include: [{ model: Pelicula, through: ActorEnPeli }, { model: Usuario }]
  });

  if (!actor) {
    return next(
      new AppError(400, 'Puede que el usuario no exista o halla sido eliminado')
    );
  }
  res.status(200).json({
    status: 'operación exitosa',
    data: comentarioUnico
  });
});

exports.crearComentario = recibirAsinc(async (req, res, next) => {
  const { titulo, puntuacion, comentario, usuarioId, peliculaId } = req.body;
  if (!titulo || !puntuacion || !comentario || !usuarioId || !peliculaId) {
    return next(
      new AppError(
        400,
        'Prueba con un nombre,nacionalidad,imagen,genero o edad valido'
      )
    );
  }

  const nuevoComentario = Comentario.create({
    titulo,
    puntuacion,
    comentario,
    usuarioId,
    peliculaId
  });
  res.status(201).json({
    status: 'Comentario creado',
    data:  nuevoComentario 
  });
});

exports.modificarComentario = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const { titulo, puntuacion, comentario } = req.body;
  const comentarioModificado = { titulo, puntuacion, comentario  };

  const comentarioHecho = await Comentario.findOne({ whrere: { status: 'activo', id } });
  if (!comentario) {
    res.status(400).json({
      status: 'Error',
      message: 'El comentario no se encuentra en la base de datos'
    });
  }

  await comentarioHecho.update({ ...comentarioModificado });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El comentario fue modificado exitosamente'
  });
});

exports.eliminarComentario = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const comentarioAEliminar = await Comentario.findOne({
    where: { status: 'activo', id }
  });

  if (!comentarioAEliminar) {
    res.status(400).json({
      status: 'Error',
      message: 'El comentario no existe en la base de datos'
    });
  }

  await comentarioAEliminar.update({ status: 'eliminado' });

  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El comentario fue eliminado exitosamente'
  });
});
