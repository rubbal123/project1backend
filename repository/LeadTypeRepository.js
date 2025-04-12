const LeadType = require('../model/LeadType');
const OrganisationProfile = require('../model/OrganisationProfile');

class LeadTypeRepository {
    async addLeadType(userId, leadTypeName) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadType = await LeadType.create({ organisationId, leadTypeName });
            return { statusCode: 200, message: "Lead Type create successfully", data: leadType };
        } catch (error) {
            console.log("error in addLeadType", error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
    async getAllLeadType(userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadType = await LeadType.findAll({ where: { organisationId } });
            if (!leadType) {
                return { statusCode: 400, message: "Lead Types not found", data: {} };
            }
            console.log(leadType);
            return { statusCode: 200, message: "Lead Types found", data: leadType };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async updateLeadType(id, userId, leadTypeName) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadType = await LeadType.findOne({ where: { id, organisationId } });
            if (!leadType) {
                return { statusCode: 400, message: "Lead Type with this id and Organisation not found", data: {} };
            }
            leadType.update({ leadTypeName });
            return { statusCode: 200, message: "Lead Type updated successfully", data: { id: leadType.id, leadTypeName: leadType.leadTypeName } };
        } catch {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async deleteLeadType(id, userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 404, message: "Organisation Profile not found", data: {} };
            }
            const organisationId = organisationProfile.id;
            const leadType = await LeadType.findOne({ where: { id, organisationId } });
            if (!leadType) {
                return { statusCode: 400, message: "Lead Type not found", data: {} };
            }
            leadType.destroy();
            return { statusCode: 200, message: "Lead Type deleted successfully", data: { leadType } };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

}

module.exports = new LeadTypeRepository();