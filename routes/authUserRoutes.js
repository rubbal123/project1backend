const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/register', UserController.registerUser);

router.post('/signin', UserController.loginUser);

module.exports = router;