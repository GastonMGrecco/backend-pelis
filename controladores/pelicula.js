const { Pelicula } = require('../tablas/pelicula');
const { Actor } = require('../tablas/actor');
const { Comentario } = require('../tablas/comentario');
const { ActorEnPeli } = require('../tablas/actorEnPeli');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utilidades/firebase');

exports.obtenerPeliculas = recibirAsinc(async (req, res, next) => {
  const peliculas = await Pelicula.findAll({
    where: { status: 'activo' },
    include: [{ model: Actor, through: ActorEnPeli }, { model: Comentario }]
  });

  const peliculasPromesa = peliculas.map(
    async ({
      titulo,
      puntuacion,
      imagen,
      resena,
      duracion,
      genero,
      createdAt,
      updatedAt,
      actors,
      comentarios
    }) => {
      const imagenRef = ref(storage, imagen);

      const direccionUrlImagen = await getDownloadURL(imagenRef);

      return {
        titulo,
        puntuacion,
        imagen: direccionUrlImagen,
        resena,
        duracion,
        genero,
        createdAt,
        updatedAt,
        actors,
        comentarios
      };
    }
  );
  const peliculasResueltas = await Promise.all(peliculasPromesa);
  res.status(200).json({
    status: 'operación exitosa',
    data: peliculasResueltas
  });
});

exports.obtenerPeliculaUnica = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const pelicula = await Pelicula.findOne({
    where: { status: 'activo', id },
    include: [{ model: Actor, through: ActorEnPeli }, { model: Comentario }]
  });

  if (!pelicula) {
    return next(
      new AppError(400, 'Puede que el usuario no exista o halla sido eliminado')
    );
  }
  const {
    titulo,
    puntuacion,
    imagen,
    resena,
    duracion,
    genero,
    createdAt,
    updatedAt,
    actors,
    comentarios
  } = pelicula;

  const imagenRef = ref(storage, imagen);

  const direccionUrlImagen = await getDownloadURL(imagenRef);

  const peliculaActual = {
    titulo,
    puntuacion,
    imagen: direccionUrlImagen,
    resena,
    duracion,
    genero,
    createdAt,
    updatedAt,
    actors,
    comentarios
  };

  res.status(200).json({
    status: 'operación exitosa',
    data: peliculaActual
  });
});

exports.crearPelicula = recibirAsinc(async (req, res, next) => {
  const { titulo, puntuacion, resena, duracion, genero } = req.body;

  if (!titulo || !puntuacion || !resena || !duracion || !genero) {
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

  const nuevaPelicula = Pelicula.create({
    titulo,
    imagen: imagenCargada.metadata.fullPath,
    puntuacion,
    resena,
    duracion,
    genero
  });
  res.status(201).json({
    status: 'Actor creado',
    data: { nuevaPelicula }
  });
});

exports.modificarPelicula = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;
  const { titulo, puntuacion, resena, duracion, genero } = req.body;

  const peliculaModificada = { titulo, puntuacion, resena, duracion, genero };

  const pelicula = await Pelicula.findOne({ whrere: { status: 'activo', id } });
  if (!pelicula) {
    res.status(400).json({
      status: 'Error',
      message: 'La película no se encuentra en la base de datos'
    });
  }

  await pelicula.update({ ...peliculaModificada });
  res.status(200).json({
    status: 'Operación exitosa',
    message: 'La película fue modificado exitosamente'
  });
});

exports.eliminarPelicula = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const peliculaAEliminar = await Pelicula.findOne({
    where: { status: 'activo', id }
  });

  if (!peliculaAEliminar) {
    res.status(400).json({
      status: 'Error',
      message: 'La pelicula no existe en la base de datos'
    });
  }

  await peliculaAEliminar.update({ status: 'eliminado' });

  res.status(200).json({
    status: 'Operación exitosa',
    message: 'La pelicula fue eliminado exitosamente'
  });
});
