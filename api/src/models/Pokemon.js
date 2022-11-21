const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (database) => {
  // defino el modelo
  database.define('pokemon', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    hp: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    attack: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    height: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    weight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 }
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "https://freepngimg.com/thumb/pokemon/20118-5-pokemon-thumb.png",
      validate: { isUrl: true },
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  }, { timestamps: false });
};
