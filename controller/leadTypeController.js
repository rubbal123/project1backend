const LeadTypeRepository = require('../repository/LeadTypeRepository');

class LeadTypeController {
    async addLeadType(req, res) {
        const userId = req.user.id;
        const { leadTypeName } = req.body;
        const result = await LeadTypeRepository.addLeadType(userId, leadTypeName);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
    async getAllLeadType(req, res) {
        const userId = req.user.id;
        const result = await LeadTypeRepository.getAllLeadType(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async updateLeadType(req, res) {
        const userId = req.user.id;
        const { id, leadTypeName } = req.body;
        const result = await LeadTypeRepository.updateLeadType(id, userId, leadTypeName);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async deleteLeadType(req, res) {
        const userId = req.user.id;
        const id = req.body.id;
        const result = await LeadTypeRepository.deleteLeadType(id, userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new LeadTypeController();