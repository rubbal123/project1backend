const express = require('express');

const UserOrganisationController = require('../controller/userOrganisationController');
const User = require('../model/User');

const router = express.Router();

router.post('/addUserOrganisation', UserOrganisationController.addUserOrganisation);

module.exports = router;