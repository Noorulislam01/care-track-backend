const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { UpdateWallet, FindPatient } = require('../controller/PatientController');



router.get("/update/:patientId/:amount",UpdateWallet)
router.get("/findPatient/:patientId",FindPatient)


module.exports = router;
