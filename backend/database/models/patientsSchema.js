const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: {type: String},
  age: { type: Number },
  gender: {type: String},
  address: { type: String },
  phone: { type: String },
  medicalHistory:{type: String},
  allergy: {type: String},
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  diagnosiss: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" }],
  });

module.exports = mongoose.model("Patients", patientsSchema);
