const { Pelicula } = require('../tablas/pelicula');
const { recibirAsinc } = require('../utilidades/recibirAsinc');

exports.obtenerPeliculas = recibirAsinc(async (req, res, next) => {});

exports.crearPelicula = recibirAsinc(async (req, res, next) => {});

exports.modificarPelicula = recibirAsinc(async (req, res, next) => {});

exports.eliminarPelicula = recibirAsinc(async (req, res, next) => {});
