const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User');

const OrganisationProfile = sequelize.define('OrganisationProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    organisationName: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'organisationProfile'
})

OrganisationProfile.belongsTo(User, { foreignKey: 'userId' });

module.exports = OrganisationProfile;