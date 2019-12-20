const jwt = require('jsonwebtoken');
const User = require('../models/user');
const api_service = require('../services/api_service');

const jwt_auth = async (req, res, next) => {
    try {
        const access_token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(access_token, 'waduhekisdat');

        const user = await User.findOne({ _id: decoded._id, access_token });

        if (!user) {
            return api_service.response(res, 400, 'Invalid access_token.', null);
        }
        req.access_token = access_token;
        req.user = user;
        return next();
    } catch (error) {
        return api_service.response(res, 401, 'Error', error);
    }
}

module.exports = jwt_auth;