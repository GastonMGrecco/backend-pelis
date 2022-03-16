const { DataTypes } = requiere('sequelize');
const { sequelize } = requieres('../utilidades/baseDeDatos.js');

const Pelicula = sequelize.define('pelicula', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});
module.exports = { Pelicula };
