const config = require('../config');

const v1 = async (req, res, next) => {
    if( req.headers['app-id'] == config["api-v1"]["app-id"] && 
        req.headers['secret-key'] == config["api-v1"]["secret-key"]) {
        return next();
    }
    return res.send({ error: 'Wrong Application Key!' });
};

const v2 = async (req, res, next) => {
    if( req.headers['app-id'] == config["admin"]["app-id"] && 
        req.headers['secret-key'] == config["admin"]["secret-key"]) {
        
        return next();
    }
    return res.send({ error: 'Wrong Application Key!' });
};

module.exports = { v1, v2 };