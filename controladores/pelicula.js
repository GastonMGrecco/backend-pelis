const { Pelicula } = require('../tablas/pelicula');
const { recibirAsinc } = require('../utilidades/recibirAsinc');
const { AppError } = require('../utilidades/appError');

exports.obtenerPeliculas = recibirAsinc(async (req, res, next) => {
  const peliculas = await Pelicula.findAll({ where: { status: 'activo' } });
  res.status(200).json({
    status: 'operación exitosa',
    data: { peliculas }
  });
});

exports.obtenerPeliculaUnica = recibirAsinc(async (req, res, next) => {
  const { id } = req.params;

  const pelicula = await Pelicula.findOne({ where: { status: 'activo', id } });
  console.log(pelicula);
  if (!pelicula) {
    return next(
      new AppError(400, 'Puede que el usuario no exista o halla sido eliminado')
    );
  }
  res.status(200).json({
    status: 'operación exitosa',
    data: { pelicula }
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
  const nuevaPelicula = Pelicula.create({
    titulo,
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
