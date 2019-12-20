require('dotenv').config();

const v1 = async (req, res, next) => {
    if( req.headers['app-id'] == process.env.APP_ID_V1 && 
        req.headers['secret-key'] == process.env.SECRET_KEY_V1) {
        return next();
    }
    return res.send({ error: 'Wrong Application Key!' });
};

const v2 = async (req, res, next) => {
    if( req.headers['app-id'] == process.env.APP_ID_V2 && 
        req.headers['secret-key'] == process.env.SECRET_KEY_V2) {
        
        return next();
    }
    return res.send({ error: 'Wrong Application Key!' });
};

module.exports = { v1, v2 };