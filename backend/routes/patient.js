const express = require("express");
const {createNewPatient, getAllPatients, deletePatientById} = require("../controllers/patient");

// Middleware
const authentication = require("../middleware/authentication");

//define router
const patientsRouter = express.Router();


patientsRouter.post("/", authentication, createNewPatient);
patientsRouter.get("/", authentication, getAllPatients);
patientsRouter.delete("/:id", deletePatientById);

module.exports = patientsRouter;