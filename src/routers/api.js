const express = require('express');
const appkey = require('../middleware/appkey');
const jwt_auth = require('../middleware/jwt_auth');
const auth_controller = require('../controllers/auth_controller');
const book_controller = require('../controllers/book_controller');

const router = new express.Router();

router.post('/login', appkey.v1, auth_controller.login);

router.post('/signup', appkey.v1, auth_controller.signup);

router.get('/books', appkey.v1, jwt_auth, book_controller.getAll);

router.post('/book/create', appkey.v2, book_controller.create);

router.get('/book/request', appkey.v1, book_controller.request);

module.exports = router;