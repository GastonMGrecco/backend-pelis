const { DataTypes } = requiere('sequelize');
const { sequelize } = requieres('../utilidades/baseDeDatos.js');

const Comentario = sequelize.define('comentario', {
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
  comentario: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peliId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});
module.exports = { Comentario };
