const sequelize = require('../config/db')

const OrganisationProfile = require('../model/OrganisationProfile');
const UserOrganisation = require('../model/UserOrganisation');
const User = require('../model/User');
const Role = require('../model/Role')

const sendMail = require('../utils/sendMail');

const UserRepository = require('./UserRepository');

class UserOrganisationRepository {

    //----------------------------------------------Add UserOrganisation for admin-----------------------------------------------------
    async addUserOrganisationForAdmin(userId, organisationId) {
        try {

            //------------------------------------creating User Organisation--------------------------------
            const userOrganisation = await UserOrganisation.findOne({ where: { userId } });
            if (userOrganisation) {
                return { statusCode: 400, message: 'User Organisation already exists', data: {} };
            }
            const newUserOrganisation = await UserOrganisation.create({ userId, organisationId, roleId: 1 });
            return { statusCode: 200, message: 'User Organisation created successfully', data: { id: newUserOrganisation.id } };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //---------------------------------add User-------------------------------------------------
    async addUserOrganisation(referralId, emailId, password, confirmPassword, roleId) {
        try {
            //-----------------------------------find organisation profile of referee------------------------
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId: referralId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: 'Organisation Profile not created', data: {} };
            }

            //-------------------------------------------Creating User------------------------------------------

            const user = await UserRepository.registerUser(emailId, password, confirmPassword);

            if (user.statusCode !== 201) {
                return user;
            }

            const userId = user.data.id;
            //------------------------------------creating User Organisation--------------------------------
            const userOrganisation = await UserOrganisation.findOne({ where: { userId } });
            if (userOrganisation) {
                return { statusCode: 400, message: 'User Organisation already exists', data: {} };
            }
            const newUserOrganisation = await UserOrganisation.create({ userId, organisationId: organisationProfile.id, roleId: roleId });
            return user;
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------------Update user organisation----------------------------------------
    async updateUserOrganisation(userId, roleId) {
        try {
            const userOrganisation = await UserOrganisation.findOne({ where: { userId } });
            if (!userOrganisation) {
                return { statusCode: 400, message: 'User Organisation not found', data: {} };
            }
            userOrganisation.update({ roleId });
            return { statusCode: 200, message: 'User Organisation updated successfully', data: userOrganisation };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //---------------------------------------get user organisation------------------------------------
    async getUserOrganisation(userId) {
        try {
            const userOrganisation = await UserOrganisation.findOne({ where: { userId } });
            if (!userOrganisation) {
                return { statusCode: 400, message: 'User Organisation not found', data: {} };
            }
            return { statusCode: 200, message: "data retrieved successfully", data: userOrganisation };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //---------------------------------------get all user organisation------------------------------------
    async getAllUserOrganisation(userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: 'Organisation Profile not found', data: {} };
            }
            const organisationId = organisationProfile.id;
            const userOrganisation = await UserOrganisation.findAll({
                where: { organisationId }, attributes: ['id', 'userId', 'organisationId', 'roleId',
                    [sequelize.literal('User.emailId'), 'email'],
                    [sequelize.literal('Role.role'), 'role']],
                include: [{
                    model: User, attributes: []
                },
                {
                    model: Role,
                    attributes: []
                }],
                raw: true
            });
            if (!userOrganisation) {
                return { statusCode: 400, message: 'User Organisation not found', data: {} };
            }
            return { statusCode: 200, message: "data retrieved successfully", data: userOrganisation };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-----------------------------------------------delete user organisation--------------------------------
    async deleteUserOrganisation(userId) {
        try {
            const userOrganisation = await UserOrganisation.findOne({ where: { userId } });
            if (!userOrganisation) {
                return { statusCode: 400, message: 'User Organisation not found', data: {} };
            }
            userOrganisation.destroy();
            return { statusCode: 200, message: 'User Organisation deleted successfully', data: 1 };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------------------------------invite user------------------------------------------
    async inviteUser(userId, email, roleId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: 'Organisation Profile not found', data: {} };
            }
            const user = await User.findOne({ where: { emailId: email } });
            if (user) {
                return { statusCode: 400, message: 'User already exists', data: {} };
            }

            const subject = "Invite from Sale Funnel";
            const invitationLink = process.env.INVITATION_LINK + userId + "&roleId=" + roleId;
            const html = `<div><h1>accept invite from abc company</h1><div>link :- <a href='${invitationLink}'></div>`
            const text = "";
            const to = email;
            return await sendMail(to, subject, text, html);

        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
}

module.exports = new UserOrganisationRepository();