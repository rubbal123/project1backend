const LeadSource = require('../model/LeadSource');
const OrganisationProfile = require('../model/OrganisationProfile');

class LeadSourceRepository {
    async addLeadSource(userId, leadSourceName) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadSource = await LeadSource.create({ organisationId, leadSourceName });
            return { statusCode: 200, message: "Lead Type create successfully", data: leadSource };
        } catch (error) {
            console.log("error in addLeadSource", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
    async getAllLeadSource(userId, searchTerm) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadSource = await LeadSource.findAll({ where: { organisationId } });
            if (!leadSource) {
                return { statusCode: 400, message: "Lead Types not found", data: {} };
            }
            return { statusCode: 200, message: "Lead Types found", data: leadSource };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async updateLeadSource(id, userId, leadSourceName) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadSource = await LeadSource.findOne({ where: { id, organisationId } });
            if (!leadSource) {
                return { statusCode: 400, message: "Lead Type with this id and Organisation not found", data: {} };
            }
            leadSource.update({ leadSourceName });
            return { statusCode: 200, message: "Lead Type updated successfully", data: { id: leadSource.id, leadSourceName: leadSource.leadSourceName } };
        } catch {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async deleteLeadSource(id, userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadSource = await LeadSource.findOne({ where: { id, organisationId } });
            if (!leadSource) {
                return { statusCode: 400, message: "Lead Type not found", data: {} };
            }
            leadSource.destroy();
            return { statusCode: 200, message: "Lead Type deleted successfully", data: { leadSource } };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }


}

module.exports = new LeadSourceRepository();