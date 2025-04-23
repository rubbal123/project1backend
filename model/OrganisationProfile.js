const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Lead = require('./Lead');
const LeadType = require('./LeadType')

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
// OrganisationProfile.hasMany(Lead, { foreignKey: 'organisationId' });
// OrganisationProfile.hasMany(LeadType, { foreignKey: 'organisationId' });

module.exports = OrganisationProfile;