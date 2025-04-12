const express = require('express');
const UserOrganisationController = require('../controller/userOrganisationController');

const router = express.Router();

router.post('/getUserOrganisation', UserOrganisationController.getUserOrganisation);

router.post('/getAllUserOrganisation', UserOrganisationController.getAllUserOrganisation);

router.post('/updateUserOrganisation', UserOrganisationController.updateUserOrganisation);

router.post('/deleteUserOrganisation', UserOrganisationController.deleteUserOrganisation);

router.post('/inviteUser', UserOrganisationController.inviteUser);

module.exports = router;