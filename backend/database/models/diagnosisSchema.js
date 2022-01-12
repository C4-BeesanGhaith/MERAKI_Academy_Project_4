const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  dateOfVisit: { type: Date, default: Date.now() },
  diagnosis: { type: String, required: true },
  management: { type: String, required: true },
  totalAmount:{type: String},
  doctorSign: {type: String},
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
