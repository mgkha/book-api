const mongoose = require('mongoose');

const connect = (url) => {
    console.log('DB Service - Establishing connection.');

    const db = mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
   
    db.then((e) => {
        console.log('DB Service - Successfully connected.');
    }).catch((e) => {
        console.log(`DB Service - Failed to connect to ${url}.`);
    })
}

module.exports = { connect };