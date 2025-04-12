const Role = require('../model/Role');

class RoleRepository {
    async getRoleById(roleId) {
        try {
            const role = await Role.findByPk(roleId);
            if (!role) {
                return { statusCode: 400, message: 'no role found by this id', data: {} };
            }
            return { statusCode: 200, message: 'role retrieved successfully', data: role };
        } catch (error) {
            console.log('error in role repository', error)
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }

    async getAllRoles() {
        try {
            const roles = await Role.findAll();
            if (!roles) {
                return { statusCode: 400, message: 'no roles found', data: {} };
            }
            return { statusCode: 200, message: 'roles retrieved successfully', data: roles };
        } catch (error) {

            console.log('error in role repository', error)
            return { statusCode: 500, message: `internal server error ${error.message}`, data: {} };
        }
    }
}