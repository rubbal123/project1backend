const express = require('express');

const LeadController = require('../controller/leadController');

const router = express.Router();

router.post('/getLeadById', LeadController.getLeadById);
router.post('/getLeadByUserId', LeadController.getLeadByUserId);
router.post('/getAllLeadByOrganisationId', LeadController.getAllLeadByOrganisationId);
router.post('/addLead', LeadController.addLead);
router.post('/updateLead', LeadController.updateLead);
router.post('/deleteLead', LeadController.deleteLead);

module.exports = router;
