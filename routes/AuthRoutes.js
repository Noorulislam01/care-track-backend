const express = require('express');
const router = express.Router();
const { Patientsignup, PatientLogin, DoctorSignup, DoctorLogin } = require('../controller/AuthController');





//routes
router.post('/patientSignup', Patientsignup);
router.post("/patientLogin",PatientLogin)
router.post("/doctorSignup",DoctorSignup)
router.post("/doctorLogin",DoctorLogin)


module.exports = router;
