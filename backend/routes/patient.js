const express = require("express");
const {
  createNewPatient,
  getAllPatients,
  deletePatientById,
  updatePatientById,
  getPatientByName,
} = require("../controllers/patient");

const {
  createNewDiagnosis,
  deleteDiagnosis,
  getDiagnosisById,
} = require("../controllers/diagnosis");

// Middleware
const authentication = require("../middleware/authentication");

//define router
const patientsRouter = express.Router();

patientsRouter.post("/", authentication, createNewPatient);
patientsRouter.get("/", authentication, getAllPatients);
patientsRouter.get("/search", getPatientByName);
patientsRouter.delete("/:id", deletePatientById);
patientsRouter.patch("/:id", updatePatientById);

patientsRouter.post("/:id/diagnosis", authentication, createNewDiagnosis);
patientsRouter.get("/diagnosis", getDiagnosisById);
patientsRouter.delete("/:id/diagnosis", deleteDiagnosis);

module.exports = patientsRouter;
