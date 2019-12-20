const express = require('express');
const bodyParser = require('body-parser');

const db_service = require('./services/db_service');
const apiRouter = require('./routers/api');

const app = express();
const port = 3000;

db_service.connect('mongodb://127.0.0.1:27017/wadu');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});