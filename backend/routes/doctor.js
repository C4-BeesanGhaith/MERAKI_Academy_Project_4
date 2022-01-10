const express = require("express");
const {createNewDoctor} = require("../controllers/doctor");

const doctorsRouter = express.Router();

doctorsRouter.post("/", createNewDoctor);

module.exports = doctorsRouter;