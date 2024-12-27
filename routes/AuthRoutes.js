const express = require('express');
const { Patientsignup, PatientLogin, DoctorSignup, DoctorLogin } = require('../controller/AuthController');


const router = express.Router();


router.post('/patientSignup', Patientsignup);
router.post("/patientLogin",PatientLogin)
router.post("/doctorSignup",DoctorSignup)
router.post("/doctorLogin",DoctorLogin)


module.exports = router;
