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
  peliId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
module.exports = { ActorEnPeli };
