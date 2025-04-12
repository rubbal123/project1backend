const express = require('express');

const UserController = require('../controller/userController');
const router = express.Router();

router.post('/getprofile', UserController.getUserData);

router.post('/profile', UserController.updateProfile);

router.post('/updatepassword', UserController.updateUserPassword);

router.post('/deleteUser', UserController.deleteUser);

module.exports = router;