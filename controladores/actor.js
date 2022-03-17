const { Actor } = require('../tablas/actor');
const { recibirAsinc } = require('../utilidades/recibirAsinc');

exports.obtenerActores = recibirAsinc(async (req, res, next) => {});

exports.crearActor = recibirAsinc(async (req, res, next) => {});

exports.modificarActor = recibirAsinc(async (req, res, next) => {});

exports.eliminarActor = recibirAsinc(async (req, res, next) => {});
