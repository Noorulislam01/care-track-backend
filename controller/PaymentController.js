const Payment = require("../models/Payment");

exports.makePayment = async (req, res) => {
  try {
    
    const { patientName, doctorName, patientId, doctorId, totalAmount, discount } = req.body;

  
    if (!patientName || !doctorName || !patientId || !doctorId || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

   
    const newDiscount = new Payment({
      patientName,
      doctorName,
      patientId,
      doctorId,
      totalAmount,
      discount,
    });

    
    const savedPayment = await newDiscount.save();

   
    res.status(201).json({
      message: 'Payment Done successfully',
      data: savedPayment,
    });
  } catch (error) {
    console.error('Error Doing payment:', error);
    res.status(500).json({ message: 'An error occurred while saving the discount', error });
  }
};


exports.findPayment = async (req, res) => {
  try {

    const { patientId, doctorId } = req.params;

    if (!patientId || !doctorId) {
      return res.status(400).json({ message: 'Both patientId and doctorId are required' });
    }


    const payments = await Payment.find({ patientId, doctorId });

   
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given patientId and doctorId' });
    }

    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments,
    });
  } catch (error) {
    console.error('Error finding payments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the payments', error });
  }
};



exports.findBypatientId = async (req, res) => {
  try {
   
    const { patientId } = req.params;


    if (!patientId ) {
      return res.status(400).json({ message: 'patientId not given' });
    }

   
    const payments = await Payment.find({ patientId:patientId });

   
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given patientId' });
    }

   
    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments,
    });
  } catch (error) {
    console.error('Error finding payments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the payments', error });
  }
};


exports.FindAlll=async(req,res)=>{
   
   try {
    const doctors= await Payment.find()
    
    res.status(200).json(doctors)
    
   } catch (error) {
    res.status(500).json({ message: 'Error retrieving doctors' });
   }

}


exports.findPaymentByDoctor=async(req,res)=>{
 
  try {

    const {doctorId } = req.params;


    if (!doctorId ) {
      return res.status(400).json({ message: 'doctorId not given' });
    }

    const payments = await Payment.find({ doctorId:doctorId });

 
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given doctor' });
    }

    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments,
    });
  } catch (error) {
    console.error('Error finding payments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the payments', error });
  }

}