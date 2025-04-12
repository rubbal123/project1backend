const LeadRepository = require('../repository/LeadRepository');

class LeadController {
    async getLeadById(req, res) {
        const { id } = req.body;
        const result = await LeadRepository.getLeadById(id);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
    async getLeadByUserId(req, res) {
        const userId = req.user.id;
        const result = await LeadRepository.getLeadByUserId(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
    async getAllLeadByOrganisationId(req, res) {
        const userId = req.user.id;
        const result = await LeadRepository.getAllLeadByOrganisationId(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async addLead(req, res) {
        const userId = req.user.id;
        const { employeeId, leadTypeId, leadSourceId, description, status } = req.body;
        const result = await LeadRepository.addLead(userId, employeeId, leadTypeId, leadSourceId, description, status);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async updateLead(req, res) {
        const { id, employeeId, leadTypeId, leadSourceId, status, description } = req.body;
        const result = await LeadRepository.updateLead(id, employeeId, leadTypeId, leadSourceId, status, description);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async deleteLead(req, res) {
        const { id } = req.body;
        const result = await LeadRepository.deleteLead(id);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new LeadController();