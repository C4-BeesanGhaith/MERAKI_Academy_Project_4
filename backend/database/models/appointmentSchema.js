const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  doctor: { type: String },
  phone: { type: String },
  appointmentDate: { type: String },
  appointmentTime: { type: String },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
