const { Actor } = require('../tablas/actor');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');

exports.obtenerActores = recibirAsinc(async (req, res, next) => {
  const actores = await Actor.findAll({ where: { status: 'activo' } });
  res.status(200).json({
    status: 'operación exitosa',
    data: { actores }
  });
});

exports.obtenerActorUnico = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { status: 'activo', id } });
  console.log(actor);
  if (!actor) {
    return next(
      new AppError(400, 'Puede que el usuario no exista o halla sido eliminado')
    );
  }
  res.status(200).json({
    status: 'operación exitosa',
    data: { actor }
  });
});

exports.crearActor = recibirAsinc(async (req, res, next) => {
  const { nombre, nacionalidad, imagen, genero, edad } = req.body;
  if (!nombre || !nacionalidad || !imagen || !genero || !edad) {
    return next(
      new AppError(
        400,
        'Prueba con un nombre,nacionalidad,imagen,genero o edad valido'
      )
    );
  }
  const nuevoActor = Actor.create({
    nombre,
    nacionalidad,
    imagen,
    genero,
    edad
  });
  res.status(201).json({
    status: 'Actor creado',
    data: { nuevoActor }
  });
});

exports.modificarActor = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const { nombre, nacionalidad, imagen, genero, edad } = req.body;
  const actorModificado = { nombre, nacionalidad, imagen, genero, edad };

  const actor = await Actor.findOne({ whrere: { status: 'activo', id } });
  if (!actor) {
    res.status(400).json({
      status: 'Error',
      message: 'El actor no se encuentra en la base de datos'
    });
  }

  await actor.update({ ...actorModificado });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El actor fue modificado exitosamente'
  });
});

exports.eliminarActor = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const actorAEliminar = await Actor.findOne({
    where: { status: 'activo', id }
  });

  if (!actorAEliminar) {
    res.status(400).json({
      status: 'Error',
      message: 'El actor no existe en la base de datos'
    });
  }

  await actorAEliminar.update({ status: 'eliminado' });

  res.status(200).json({
    status: 'Operación exitosa',
    message: 'El actor fue eliminado exitosamente'
  });
});
