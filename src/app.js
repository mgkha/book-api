const express = require('express');
const bodyParser = require('body-parser');

const db_service = require('./services/db_service');
const apiRouter = require('./routers/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

db_service.connect(process.env.MONGO_DB);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});