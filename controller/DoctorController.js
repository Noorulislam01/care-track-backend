const Doctor = require("../models/Doctor");


exports.FindAllDoctor=async(req,res)=>{
   
   try {
    const doctors= await Doctor.find()
    
    res.status(200).json(doctors)
    
   } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors' });
   }

}

exports.FindById=async(req,res)=>{
   const{id}=req.params
   // console.log(id)
   try {
    const doctors= await Doctor.findById(id)
    
    res.status(200).json(doctors)
    
   } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors' });
   }

}