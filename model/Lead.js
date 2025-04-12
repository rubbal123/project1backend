const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const OrganisationProfile = require('./OrganisationProfile');
const LeadType = require('./LeadType');
const LeadSource = require('./LeadSource');

const Lead = sequelize.define('Lead', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        unique: true,
        onDelete: 'CASCADE'
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
    leadTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LeadType,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    leadSourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LeadSource,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'leads'
})

Lead.belongsTo(User, { foreignKey: 'userId' });
Lead.belongsTo(OrganisationProfile, { foreignKey: 'organisationId' });
Lead.belongsTo(LeadType, { foreignKey: 'leadTypeId' });
Lead.belongsTo(LeadSource, { foreignKey: 'leadSourceId' });

module.exports = Lead;