const { DataTypes } = require('sequelize');
const { sequelize } = require('../utilidades/baseDeDatos.js');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  nacionalidad: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'activo',
    allowNull: false
  }
});
module.exports = { Actor };
