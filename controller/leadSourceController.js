const LeadSourceRepository = require('../repository/LeadSourceRepository');

class LeadSourceController {
    async addLeadSource(req, res) {
        const userId = req.user.id;
        const { leadSourceName } = req.body;
        const result = await LeadSourceRepository.addLeadSource(userId, leadSourceName);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
    async getAllLeadSource(req, res) {
        const userId = req.user.id;
        const result = await LeadSourceRepository.getAllLeadSource(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async updateLeadSource(req, res) {
        const userId = req.user.id;
        const { id, leadSourceName } = req.body;
        const result = await LeadSourceRepository.updateLeadSource(id, userId, leadSourceName);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async deleteLeadSource(req, res) {
        const userId = req.user.id;
        const id = req.body.id;
        const result = await LeadSourceRepository.deleteLeadSource(id, userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new LeadSourceController();