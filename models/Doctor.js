const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing the password

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
   degree: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number, // Consultation rate
    required: true,
    default: 0.0,
  },
  description: {
    type: String, // Short description about the doctor
  },
  imageUrl: {
    type: String, // URL of the image stored in Firebase Storage
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});





module.exports = mongoose.model('Doctor', doctorSchema);
