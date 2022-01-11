const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  dateOfVisit: { type: Date },
  diagnosis: { type: String },
  Management: { type: String },
  doctorSign: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
