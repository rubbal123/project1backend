const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.ENUM("admin", "manager", "employee"),
        allowNull: false,
    }
}, {
    tableName: 'roles',
})

module.exports = Role;