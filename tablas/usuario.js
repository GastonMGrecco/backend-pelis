const { DataTypes } = require('sequelize');
const { sequelize } = require('../utilidades/baseDeDatos.js');

const Usuario = sequelize.define('usuario', {
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
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  permisos: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'activo',
    allowNull: false
  }
});
module.exports = { Usuario };
