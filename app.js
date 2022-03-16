const express = require('express');
const { sequelize } = require('./utilidades/baseDeDatos');
const { Relaciones } = require('./tablas/relacionTablas');

const app = express();
app.use(express.json());
sequelize
  .authenticate()
  .then(() => console.log('Base de datos autenticada'))
  .catch((error) => console.log(error));

app.use(Relaciones());

sequelize
  .sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log(error));

app.listen(4000, () => {
  console.log('Servidor corriendo en puerto 4000');
});
