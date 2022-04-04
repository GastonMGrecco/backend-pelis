const { Comentario } = require('../tablas/comentario');
const { ActorEnPeli } = require('../tablas/actorEnPeli');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');

exports.obtenerActorEnPelis = recibirAsinc(async (req, res, next) => {
  const ActorEnPelis = await ActorEnPeli.findAll({
    where: { status: 'activo' }
  });
  res.status(200).json({
    status: 'operación exitosa',
    data: ActorEnPelis
  });
});

exports.crearActorEnPeli = recibirAsinc(async (req, res, next) => {
  const { actorId, peliculaId } = req.body;
  if (!actorId || !peliculaId) {
    return next(new AppError(400, 'Ingresa un actorId o peliculaId validos'));
  }

  const actorEnPeliNuevo = await ActorEnPeli.create({
    actorId,
    peliculaId
  });
  res.status(201).json({
    status: 'Relacion creada',
    data: actorEnPeliNuevo
  });
});

exports.modificarActorEnPeli = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const { actorId, peliculaId } = req.body;
  const relacionModificada = { actorId, peliculaId };

  const relacion = await Comentario.findOne({
    whrere: { status: 'activo', id }
  });
  if (!relacion) {
    res.status(400).json({
      status: 'Error',
      message: 'La relacion no se encuentra en la base de datos'
    });
  }

  await relacion.update({ ...relacionModificada });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'La relacion fue modificada exitosamente'
  });
});

exports.eliminarActorEnPeli = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const relacionAEliminar = await Comentario.findOne({
    where: { status: 'activo', id }
  });

  if (!relacionAEliminar) {
    res.status(400).json({
      status: 'Error',
      message: 'La relacion no existe en la base de datos'
    });
  }

  await relacionAEliminar.update({ status: 'eliminado' });

  res.status(200).json({
    status: 'Operación exitosa',
    message: 'La relacion fue eliminada exitosamente'
  });
});
