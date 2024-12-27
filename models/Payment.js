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
    type: mongoose.Schema.Types.ObjectId, // Assuming it references a Patient model
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it references a Doctor model
    ref: 'Doctor',
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number, // Percentage or flat amount
    default:0,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets to current date
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
