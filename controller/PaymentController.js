const Payment = require("../models/Payment");

exports.makePayment = async (req, res) => {
  try {
    // Extract data from the request body
    const { patientName, doctorName, patientId, doctorId, totalAmount, discount } = req.body;

    // Validate required fields
    if (!patientName || !doctorName || !patientId || !doctorId || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new discount document
    const newDiscount = new Payment({
      patientName,
      doctorName,
      patientId,
      doctorId,
      totalAmount,
      discount,
    });

    // Save the document to the database
    const savedPayment = await newDiscount.save();

    // Respond with the saved document
    res.status(201).json({
      message: 'Payment Done successfully',
      data: savedPayment,
    });
  } catch (error) {
    console.error('Error Doing payment:', error);
    res.status(500).json({ message: 'An error occurred while saving the discount', error });
  }
};

// Function to find payment by patientId and doctorId
exports.findPayment = async (req, res) => {
  try {
    // Extract patientId and doctorId from the request query
    const { patientId, doctorId } = req.params;

    // Validate required fields
    if (!patientId || !doctorId) {
      return res.status(400).json({ message: 'Both patientId and doctorId are required' });
    }

    // Find payments matching the criteria
    const payments = await Payment.find({ patientId, doctorId });

    // Check if any payments are found
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given patientId and doctorId' });
    }

    // Respond with the found payments
    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments,
    });
  } catch (error) {
    console.error('Error finding payments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the payments', error });
  }
};


// Function to find payment by patientId and doctorId
exports.findBypatientId = async (req, res) => {
  try {
    // Extract patientId and doctorId from the request query
    const { patientId } = req.params;

    // Validate required fields
    if (!patientId ) {
      return res.status(400).json({ message: 'patientId not given' });
    }

    // Find payments matching the criteria
    const payments = await Payment.find({ patientId:patientId });

    // Check if any payments are found
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given patientId' });
    }

    // Respond with the found payments
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
    // Extract patientId and doctorId from the request query
    const {doctorId } = req.params;

    // Validate required fields
    if (!doctorId ) {
      return res.status(400).json({ message: 'doctorId not given' });
    }

    // Find payments matching the criteria
    const payments = await Payment.find({ doctorId:doctorId });

    // Check if any payments are found
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for the given doctor' });
    }

    // Respond with the found payments
    res.status(200).json({
      message: 'Payments retrieved successfully',
      data: payments,
    });
  } catch (error) {
    console.error('Error finding payments:', error);
    res.status(500).json({ message: 'An error occurred while fetching the payments', error });
  }

}