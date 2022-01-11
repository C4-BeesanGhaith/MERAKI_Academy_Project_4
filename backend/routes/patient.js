const express = require("express");
const {createNewPatient, getAllPatients} = require("../controllers/patient");

// Middleware
const authentication = require("../middleware/authentication");

//define router
const patientsRouter = express.Router();


patientsRouter.post("/", authentication, createNewPatient);
patientsRouter.get("/", authentication, getAllPatients);

module.exports = patientsRouter;