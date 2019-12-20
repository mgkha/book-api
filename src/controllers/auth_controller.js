const User = require('../models/user');
const api_service = require('../services/api_service');

const signup = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const access_token = await user.generateAuthToken();
        return api_service.response(res, 200, 'Success', {user, access_token});
    } catch (error) {
        return api_service.response(res, 401, 'Error', error);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user) {
            return api_service.response(res, 400, "Email and Password do not match.", null);
        }
        const access_token = await user.generateAuthToken();
        return api_service.response(res, 200, 'Success', {user, access_token});
    } catch (error) {
        return api_service.response(res, 401, 'Error', error);
    }
}

module.exports = { signup, login };