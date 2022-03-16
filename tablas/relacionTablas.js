const { Actor } = require('./actor');
const { ActorEnPeli } = require('./actorEnPeli');
const { Comentario } = require('./comentario');
const { Pelicula } = require('./pelicula');
const { Usuario } = require('./usuario');

const Relaciones = () => {
  Usuario.hasMany(Comentario);
  Comentario.belongsTo(Usuario);

  Pelicula.hasMany(Comentario);
  Comentario.belongsTo(Pelicula);

  ActorEnPeli.hasMany(Actor);

  ActorEnPeli.hasMany(Pelicula);
};
module.exports = { Relaciones };
