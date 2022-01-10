const express = require("express");
const {createNewPatient} = require("../controllers/patient");

//define router
const patientsRouter = express.Router();

patientsRouter.post("/", createNewPatient);

module.exports = patientsRouter;