const mongoose = require('mongoose');


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
    type: Number, 
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});





module.exports = mongoose.model('Doctor', doctorSchema);
