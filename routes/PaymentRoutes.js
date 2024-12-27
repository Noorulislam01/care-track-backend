const express = require('express');
const { findPayment, makePayment, findBypatientId, FindAlll, findPaymentByDoctor,  } = require('../controller/PaymentController');
const router = express.Router();


router.get("/findPair/:patientId/:doctorId",findPayment)
router.get("/findbyPatient/:patientId",findBypatientId)
router.post("/make",makePayment)
router.get("/findAll",FindAlll)
router.get("/findbyDoctorId/:doctorId" ,findPaymentByDoctor)


module.exports = router;