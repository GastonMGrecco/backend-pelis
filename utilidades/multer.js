const multer = require('multer');

const { AppError } = require('./appError');

const storage = multer.memoryStorage();

const filtroArchivos = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    cb(new AppError(400, 'El archivo debe ser de tipo imagen'), false);
  } else {
    cb(null, true);
  }
};

const imagenCargada = multer({
  storage,
  archivoFiltrado: filtroArchivos
});

module.exports = { imagenCargada };
