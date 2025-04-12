const User = require('../model/User');
const UserOrganisationRepository = require('../repository/UserOrganisationRepository');

class UserOrganisationController {

    async addUserOrganisation(req, res) {
        const { referralId, emailId, password, confirmPassword, roleId } = req.body;
        const result = await UserOrganisationRepository.addUserOrganisation(referralId, emailId, password, confirmPassword, roleId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async getUserOrganisation(req, res) {
        const userId = req.user.id;
        const result = await UserOrganisationRepository.getUserOrganisation(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async getAllUserOrganisation(req, res) {
        const userId = req.user.id;
        const result = await UserOrganisationRepository.getAllUserOrganisation(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async updateUserOrganisation(req, res) {
        const { userId, roleId } = req.body;
        const result = await UserOrganisationRepository.updateUserOrganisation(userId, roleId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async deleteUserOrganisation(req, res) {
        const userId = req.user.id;
        const result = await UserOrganisationRepository.deleteUserOrganisation(userId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    async inviteUser(req, res){
        const userId = req.user.id;
        const {email, roleId} = req.body;
        const result = await UserOrganisationRepository.inviteUser(userId, email, roleId);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new UserOrganisationController();