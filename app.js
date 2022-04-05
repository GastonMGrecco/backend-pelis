const express = require('express');
const { rutasActor } = require('./rutas/actor');
const { rutasPelicula } = require('./rutas/pelicula');
const { rutasUsuario } = require('./rutas/usuario');
const { rutasComentario } = require('./rutas/comentario');
const { rutasActorEnPeli } = require('./rutas/actorEnPeli');
const { manejadorErrorGlobal } = require('./controladores/error');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/actor', rutasActor);
app.use('/api/v1/pelicula', rutasPelicula);
app.use('/api/v1/usuario', rutasUsuario);
app.use('/api/v1/comentario', rutasComentario);
app.use('/api/v1/actorenpeli', rutasActorEnPeli);

app.use(manejadorErrorGlobal);
module.exports = { app };
