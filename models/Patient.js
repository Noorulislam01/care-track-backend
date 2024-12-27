const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 2000.0, // Default wallet balance is 0.0
  },
 
});



module.exports = mongoose.model('Patient', patientSchema);
