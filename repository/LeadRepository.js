const sequelize = require('../config/db');
const Lead = require('../model/Lead');
const User = require('../model/User');
const OrganisationProfile = require('../model/OrganisationProfile');
const LeadSource = require('../model/LeadSource');
const LeadType = require('../model/LeadType');

class LeadRepository {

    //--------------------------------get leads by id---------------------------------------
    async getLeadById(id) {
        try {
            const lead = await Lead.findOne({ where: { id } });

            if (!lead) {
                return { statusCode: 400, message: 'Lead of this id not found', data: {} };
            }
            return { statusCode: 200, message: 'Lead found', data: lead };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }

    }

    //-------------------------------get leads by user id---------------------------------------
    async getLeadByUserId(userId) {

        try {
            const lead = await Lead.findOne({ where: { userId } });

            if (!lead) {
                return { statusCode: 400, message: 'Lead of this userid not found', data: {} };
            }
            return { statusCode: 200, message: 'Lead found', data: lead };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //---------------------------------get leads by Organisation id---------------------------------------
    async getAllLeadByOrganisationId(userId) {

        try {
            //------------------------------only admin can get all leads-------------------------------
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            const organisationId = organisationProfile.id;
            const leads = await Lead.findAll({
                where: { organisationId },
                attributes: ['id', 'userId', 'organisationId', 'leadTypeId', 'leadSourceId', 'description', 'status',
                    [sequelize.literal('User.firstName'), 'firstName'],
                    [sequelize.literal('User.lastName'), 'lastName'],
                    [sequelize.literal('User.emailId'), 'email'],
                    [sequelize.literal('LeadType.leadTypeName'), 'leadTypeName'],
                    [sequelize.literal('LeadSource.leadSourceName'), 'leadSourceName'],
                ],
                include: [{
                    model: User, attributes: []
                },
                {
                    model: LeadType, attributes: []
                },
                {
                    model: LeadSource, attributes: []
                }]
            });

            if (!leads) {
                return { statusCode: 400, message: 'Lead of this organisation id not found', data: {} };
            }
            return { statusCode: 200, message: 'Lead found', data: leads };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async addLead(userId, employeeId, leadTypeId, leadSourceId, description, status) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: 'Organisation profile of userId not found', data: {} };
            }
            const lead = await Lead.findOne({ where: { userId: employeeId } });
            if (lead) {
                return { statusCode: 400, message: 'Lead for this user already exists', data: {} };
            }

            const organisationId = organisationProfile.id;
            const newLead = await Lead.create({ userId: employeeId, organisationId, description, leadTypeId, leadSourceId, status });
            return { statusCode: 200, message: 'Lead created', data: newLead };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
    async updateLead(id, employeeId, leadTypeId, leadSourceId, status, description) {
        try {
            const lead = await Lead.findOne({ where: { id } });
            if (!lead) {
                return { statusCode: 400, message: 'Lead of userId does not exists', data: {} };
            }
            lead.update({ userId: employeeId, leadTypeId, leadSourceId, status, description })
            return { statusCode: 200, message: 'Lead Updated', data: lead };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async deleteLead(id) {
        try {
            const lead = await Lead.findOne({ where: { id } });
            if (!lead) {
                return { statusCode: 400, message: 'Lead of Id not found', data: {} };
            }
            lead.destroy();
            return { statusCode: 200, message: 'Lead deleted', data: {} };
        } catch (error) {
            console.log("error in lead repository", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
}

module.exports = new LeadRepository();