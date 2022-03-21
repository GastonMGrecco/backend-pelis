const express = require('express');
const { rutasActor } = require('./rutas/actor');
const { rutasPelicula } = require('./rutas/pelicula');
const { rutasUsuario } = require('./rutas/usuario');

const app = express();

app.use(express.json());

app.use('/api/v1/actor', rutasActor);
app.use('/api/v1/pelicula', rutasPelicula);
app.use('/api/v1/usuario', rutasUsuario);

module.exports = { app };
