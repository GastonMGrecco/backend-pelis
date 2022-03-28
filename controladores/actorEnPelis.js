const { Comentario } = require('../tablas/comentario');
const { Pelicula } = require('../tablas/pelicula');
const { Usuario } = require('../tablas/usuario');
const { ActorEnPeli } = require('../tablas/actorEnPeli');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');


exports.obtenerActorEnPelis = recibirAsinc(async (req, res, next) => {
  const ActorEnPelis = await ActorEnPeli.findAll({where:{status:'activo'}});
  res.status(200).json({
    status: 'operación exitosa',
    data: ActorEnPelis
  });
});

exports.crearActorEnPeli = recibirAsinc(async (req, res, next) => {
  const { actorId,peliculaId } = req.body;
  if (!actorId||!peliculaId) {
    return next(
      new AppError(
        400,
        'Prueba con un nombre,nacionalidad,imagen,genero o edad valido'
      )
    );
  }

  const actorEnPeliNuevo = ActorEnPeli.create({
    actorId,peliculaId
  });
  res.status(201).json({
    status: 'Comentario creado',
    data:  actorEnPeliNuevo 
  });
});

exports.modificarActorEnPeli = recibirAsinc(async (req, res, next) => {
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

exports.eliminarActorEnPeli = recibirAsinc(async (req, res, next) => {
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
