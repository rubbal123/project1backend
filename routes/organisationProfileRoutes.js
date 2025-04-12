const express = require('express');
const OrganisationProfileController = require('../controller/organisationProfileController');
const router = express.Router();

router.post('/getOrganisationProfile', OrganisationProfileController.getOrganisationProfile)

router.post('/updateOrganisationProfile', OrganisationProfileController.addOrUpdateOrganisationProfile);

router.post('/deleteOrganisationProfile', OrganisationProfileController.deleteOrganisationProfile);


module.exports = router;