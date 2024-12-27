const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

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
    default: 0.0, // Default wallet balance is 0.0
  },
 
});



module.exports = mongoose.model('Patient', patientSchema);
