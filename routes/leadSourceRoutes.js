const express = require('express');
const LeadSourceController = require('../controller/leadSourceController')

const router = express.Router();

router.post('/getAllLeadSource', LeadSourceController.getAllLeadSource);

router.post('/addLeadSource', LeadSourceController.addLeadSource);

router.post('/updateLeadSource', LeadSourceController.updateLeadSource);

router.post('/deleteLeadSource', LeadSourceController.deleteLeadSource);

module.exports = router;