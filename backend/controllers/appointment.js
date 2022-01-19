const appointmentModel = require("../database/models/appointmentSchema");

const createNewAppointment = (req, res) => {
  const { patient, doctor, phone, appointmentDate, appointmentTime } = req.body;

  const appointment = new appointmentModel({
    patient,
    doctor,
    phone,
    appointmentDate,
    appointmentTime,
  });

  appointment
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Success appointment Added",
        appointment: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};


const getAllAppointment = (req, res) => {
    appointmentModel.find({}).then((result) => {
        if (result.length) {
            res.status(200).json({
              success: true,
              message: "All the appointments",
              appointment: result,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "No Appointment Yet",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Server Error",
          });
        });
    };


const deleteAppointmentById = (req, res) => {
  const id = req.params.id;
  appointmentModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Appointment: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete appointment with id: ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  createNewAppointment,
  deleteAppointmentById,
  getAllAppointment,
};
