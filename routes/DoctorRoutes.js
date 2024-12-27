const express=require("express");
const {  FindAllDoctor,  FindById } = require("../controller/DoctorController");
const router = express.Router();


router.get("/findAll",FindAllDoctor)
router.get("/findById/:id",FindById)

module.exports = router;