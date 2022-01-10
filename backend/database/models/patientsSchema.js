const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  phone: { type: String },
  dateOfVisit: { type: Date },
  diagnosis: { type: String },
  Management: { type: String },
  doctorSign: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = mongoose.model("Patients", patientsSchema);
