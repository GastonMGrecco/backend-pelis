const { DataTypes } = require('sequelize');
const { sequelize } = require('../utilidades/baseDeDatos.js');

const ActorEnPeli = sequelize.define('actorenpeli', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peliculaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'activo',
    allowNull: false
  }
});
module.exports = { ActorEnPeli };
