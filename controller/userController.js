const UserRepository = require("../repository/UserRepository");


class UserController {

    //------------------------------------Register user-------------------------------------------
    async registerUser(req, res) {
        const { emailId, password, confirmPassword } = req.body;
        const result = await UserRepository.registerUser(emailId, password, confirmPassword);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    //-------------------------Login User------------------------------------
    async loginUser(req, res) {
        const { emailId, password } = req.body;
        const result = await UserRepository.loginUser(emailId, password);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    //-------------------------Get User Data------------------------------------
    async getUserData(req, res) {
        const { id } = req.user;
        const result = await UserRepository.getUserData(id);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }


    //-------------------------Update User Profile------------------------------------
    async updateProfile(req, res) {
        const { id } = req.user;
        const { firstName, lastName, country, state, city, contactNumber } = req.body;
        const result = await UserRepository.updateProfile(id, firstName, lastName, country, state, city, contactNumber);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    //-------------------------Update User Password------------------------------------
    async updateUserPassword(req, res) {
        const { id } = req.user;
        const { oldPassword, password } = req.body;
        const result = await UserRepository.updateUserPassword(id, oldPassword, password);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }

    //-------------------------Delete User------------------------------------
    async deleteUser(req, res) {
        const { id } = req.user;
        const result = await UserRepository.deleteUser(id);
        return res.status(result.statusCode).json({ message: result.message, data: result.data });
    }
}

module.exports = new UserController();
