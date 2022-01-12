const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  phone: { type: String },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  diagnosiss: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis" }],
  });

module.exports = mongoose.model("Patients", patientsSchema);
