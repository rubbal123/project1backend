const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const OrganisationProfile = require('./OrganisationProfile');

const LeadSource = sequelize.define('LeadSource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    organisationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrganisationProfile,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    leadSourceName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'leadSources',
})

LeadSource.belongsTo(OrganisationProfile, { foreignKey: 'organisationId' });

module.exports = LeadSource;
