const OrganisationProfileRepository = require('../repository/OrganisationProfileRepository');

class OrganisationProfileController {
    async addOrUpdateOrganisationProfile(req, res) {
        const userId = req.user.id;
        const { organisationName, country, state, city } = req.body;
        const result = await OrganisationProfileRepository.addOrUpdateOrganisationProfile(userId, organisationName, country, state, city);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });

    }

    async getOrganisationProfile(req, res) {
        const userId = req.user.id;
        const result = await OrganisationProfileRepository.getOrganisationProfile(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async deleteOrganisationProfile(req, res) {
        const userId = req.user.id;
        const result = await OrganisationProfileRepository.deleteOrganisationProfile(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new OrganisationProfileController();