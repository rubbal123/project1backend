const express = require('express');
const LeadTypeController = require('../controller/leadTypeController')

const router = express.Router();

router.post('/getAllLeadType', LeadTypeController.getAllLeadType);

router.post('/addLeadType', LeadTypeController.addLeadType);

router.post('/updateLeadType', LeadTypeController.updateLeadType);

router.post('/deleteLeadType', LeadTypeController.deleteLeadType);

module.exports = router;