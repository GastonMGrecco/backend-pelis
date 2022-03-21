const { app } = require('./app');

const { sequelize } = require('./utilidades/baseDeDatos');
const { Relaciones } = require('./tablas/relacionTablas');

sequelize
  .authenticate()
  .then(() => console.log('Base de datos autenticada'))
  .catch((error) => console.log(error));

Relaciones();

sequelize
  .sync(/*{ force: true }*/)
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log(error));
const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
  console.log('Servidor corriendo en puerto 4000');
});
