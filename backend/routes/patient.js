const express = require("express");
const {
  createNewPatient,
  getAllPatients,
  deletePatientById,
  updatePatientById,
} = require("../controllers/patient");

const {
  createNewDiagnosis,
  deleteDiagnosis,
  getAllDiagnosis,
} = require("../controllers/diagnosis");

// Middleware
const authentication = require("../middleware/authentication");

//define router
const patientsRouter = express.Router();

patientsRouter.post("/", authentication, createNewPatient);
patientsRouter.get("/", authentication, getAllPatients);
patientsRouter.delete("/:id", deletePatientById);
patientsRouter.put("/:id", updatePatientById);

patientsRouter.post("/:id/diagnosis", authentication, createNewDiagnosis);
patientsRouter.get("/:id/diagnosis", getAllDiagnosis);
patientsRouter.delete("/:id/diagnosis", deleteDiagnosis);

module.exports = patientsRouter;
