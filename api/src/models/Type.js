const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: false })
}