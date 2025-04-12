const OrganisationProfile = require('../model/OrganisationProfile');

const UserOrganisationRepository = require('./UserOrganisationRepository');

class OrganisationProfileRepository {
    //----------------------------------add or update organisation profile---------------------------------------
    async addOrUpdateOrganisationProfile(userId, organisationName, country, state, city) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (organisationProfile) {
                organisationProfile.update({ organisationName, country, state, city });
                return { statusCode: 200, message: 'Organisation Profile Updated Successfully', data: {} }
            }
            const newOrganisationProfile = await OrganisationProfile.create({ userId, organisationName, country, state, city });
            const organisationId = newOrganisationProfile.id;


            //----------------------------------creating userOrganisation-----------------------------------------------
            const userOrganisation = await UserOrganisationRepository.addUserOrganisationForAdmin(userId, organisationId);
            return { statusCode: 200, message: 'Organisation Profile Added Successfully', data: {} };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-----------------------------------------------get organisation profile---------------------------------------
    async getOrganisationProfile(userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: 'Organisation Profile Not found', data: {} };
            }
            return { statusCode: 200, message: 'Organisation Profile Reterieved Successfully', data: { organisationName: organisationProfile.organisationName, country: organisationProfile.country, state: organisationProfile.state, city: organisationProfile.city } };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------------------------------delete organisation profile--------------------------------------
    async deleteOrganisationProfile(userId) {
        try {
            const organisationProfile = await OrganisationProfile.findOne({ where: { userId } });
            if (!organisationProfile) {
                return { statusCode: 400, message: "Organisation Profile not found", data: {} };
            }
            organisationProfile.destroy();
            return { statusCode: 200, message: "Organisation Profile Deleted Successfully", data: {} };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

}

module.exports = new OrganisationProfileRepository();