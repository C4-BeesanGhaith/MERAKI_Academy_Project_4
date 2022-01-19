const express = require("express");
const { createNewAppointment, deleteAppointmentById, getAllAppointment } = require("../controllers/appointment");

const appointmentRouter = express.Router();

appointmentRouter.post("/", createNewAppointment);
appointmentRouter.delete("/:id", deleteAppointmentById)
appointmentRouter.get("/", getAllAppointment);

module.exports = appointmentRouter;
