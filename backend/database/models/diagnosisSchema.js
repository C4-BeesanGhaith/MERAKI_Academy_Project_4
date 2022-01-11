const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  dateOfVisit: { type: Date, default: Date.now() },
  diagnosis: { type: String },
  management: { type: String },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient:{type: mongoose.Schema.Types.ObjectId, }
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
