const response = (res, code, message, data = null) => {
    res.send({code, message, data});
}

module.exports = { response };