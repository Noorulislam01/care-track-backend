const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default:0,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
