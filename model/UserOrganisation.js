const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./User');
const OrganisationProfile = require('./OrganisationProfile');
const Role = require('./Role');

const UserOrganisation = sequelize.define('UserOrganisation', {
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
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'userOrganisation'
})

UserOrganisation.belongsTo(User, { foreignKey: 'userId' });
UserOrganisation.belongsTo(OrganisationProfile, { foreignKey: 'organisationId' });
UserOrganisation.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = UserOrganisation;