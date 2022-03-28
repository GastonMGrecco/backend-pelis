const { Actor } = require('../tablas/actor');
const { Pelicula } = require('../tablas/pelicula');
const { ActorEnPeli } = require('../tablas/actorEnPeli');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utilidades/firebase');

exports.obtenerActores = recibirAsinc(async (req, res, next) => {
  const actores = await Actor.findAll({
    where: { status: 'activo' },
    include: [{ model: Pelicula, through: ActorEnPeli }]
  });

  const actoresPromesa = actores.map(
    async ({
      nombre,
      nacionalidad,
      imagen,
      genero,
      edad,
      createdAt,
      updatedAt,
      peliculas
    }) => {
      const imagenRef = ref(storage, imagen);
      const direccionUrlImagen = await getDownloadURL(imagenRef);

      return {
        nombre,
        nacionalidad,
        imagen: direccionUrlImagen,
        genero,
        edad,
        createdAt,
        updatedAt,
        peliculas
      };
    }
  );
  const actoresResueltos = await Promise.all(actoresPromesa);
  res.status(200).json({
    status: 'operación exitosa',
    data: actoresResueltos
  });
});

exports.obtenerActorUnico = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { status: 'activo', id },
    include: [{ model: Pelicula, through: ActorEnPeli }]
  });
  const {
    nombre,
    nacionalidad,
    imagen,
    genero,
    edad,
    createdAt,
    updatedAt,
    peliculas
  } = actor;

  const imagenRef = ref(storage, imagen);
  const direccionUrlImagen = await getDownloadURL(imagenRef);

  const actorUnico = {
    nombre,
    nacionalidad,
    imagen: direccionUrlImagen,
    genero,
    edad,
    createdAt,
    updatedAt,
    peliculas
  };

  if (!actor) {
    return next(
      new AppError(400, 'Puede que el usuario no exista o halla sido eliminado')
    );
  }
  res.status(200).json({
    status: 'operación exitosa',
    data: actorUnico
  });
});

exports.crearActor = recibirAsinc(async (req, res, next) => {
  const { nombre, nacionalidad, genero, edad } = req.body;
  if (!nombre || !nacionalidad || !genero || !edad) {
    return next(
      new AppError(
        400,
        'Prueba con un nombre,nacionalidad,imagen,genero o edad valido'
      )
    );
  }
  const extencionArchivo = req.file.originalname.split('.')[1];

  const imagenRef = ref(storage, `imgs/${Date.now()}-${extencionArchivo}`);

  const imagenCargada = await uploadBytes(imagenRef, req.file.buffer);

  const nuevoActor = Actor.create({
    nombre,
    nacionalidad,
    imagen: imagenCargada.metadata.fullPath,
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
