const { Actor } = require('./actor');
const { ActorEnPeli } = require('./actorEnPeli');
const { Comentario } = require('./comentario');
const { Pelicula } = require('./pelicula');
const { Usuario } = require('./usuario');

const Relaciones = () => {
  Actor.hasMany(Pelicula);
  Pelicula.hasMany(Actor);

  Usuario.hasMany(Comentario);
  Comentario.hasOne(Usuario);

  Pelicula.hasMany(Comentario);
  Comentario.hasOne(Pelicula);

  ActorEnPeli.hasMany(Actor);
  Actor.hasMany(ActorEnPeli);

  ActorEnPeli.hasMany(Pelicula);
  Pelicula.hasMany(ActorEnPeli);
};
module.exports = { Relaciones };
