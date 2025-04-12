const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const OrganisationProfile = require('./OrganisationProfile');

const LeadType = sequelize.define('LeadType', {
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
    leadTypeName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'leadTypes',
})

LeadType.belongsTo(OrganisationProfile, { foreignKey: 'organisationId' });

module.exports = LeadType;
