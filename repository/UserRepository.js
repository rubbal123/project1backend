const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');


class UserRepository {

    //-------------------------Register User------------------------------------
    async registerUser(emailId, password, confirmPassword) {
        try {
            if (password !== confirmPassword) {
                return { status: 400, message: "Password and Confirm Password should be same", data: {} };
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const existingUser = await User.findOne({ where: { emailId } });
            if (existingUser) {
                return { statusCode: 400, message: "user with this emailId already exists", data: {} };
            }
            const user = await User.create({ emailId, password: hashedPassword });
            const token = jwt.sign({ id: user.id, emailId: user.emailId }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
            return { statusCode: 201, message: "registration successful", data: { token, id: user.id } };
        } catch (error) {
            console.error('Registration error', error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------Login User------------------------------------
    async loginUser(emailId, password) {
        try {
            const user = await User.findOne({ where: { emailId } });

            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.id, emailId: user.emailId }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
                return { statusCode: 200, message: "login successful", data: { token } };
            }
            return { statusCode: 401, message: "invalid credientials", data: {} };
        } catch (error) {
            console.error('Login error', error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------Get User Data------------------------------------
    async getUserData(id) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return { statusCode: 404, message: "error in retrieving data", data: {} };
            }
            return { statusCode: 200, message: "user data", data: { firstName: user.firstName, lastName: user.lastName, country: user.country, state: user.state, city: user.city, contactNumber: user.contact } };
        } catch (error) {
            console.error('Error in getting user data', error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }

    }

    //-------------------------Update User Profile------------------------------------
    async updateProfile(id, firstName, lastName, country, state, city, contactNumber) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return { statusCode: 404, message: "error in updating profile", data: {} };
            }
            const updatedUser = await User.update({ firstName, lastName, country, state, city, contact: contactNumber }, { where: { id } });
            return { statusCode: 200, message: "profile updated successfully", data: { updatedUser } };
        } catch (error) {
            return { statusCode: 500, message: "internal server error", data: {} };
        }
    }

    //-------------------------Update User Password------------------------------------
    async updateUserPassword(id, oldPassword, password) {
        try {
            const user = await User.findOne({ where: { id } });

            const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);

            if (!isValidOldPassword) {
                return { statusCode: 400, message: "not valid old password", data: {} };
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const result = user.update({ password: hashedPassword });
            return { statusCode: 200, message: "password updated successfully", data: result };
        } catch (error) {
            console.log('error in update', error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    //-------------------------Delete User------------------------------------
    async deleteUser(id) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return { statusCode: 400, message: "error in deleting user", data: {} };
            }
            user.destroy();
            return { statusCode: 200, message: "user deleted successfully", data: {} };
        } catch (error) {
            console.log('error in delete', error);
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }


}
module.exports = new UserRepository();