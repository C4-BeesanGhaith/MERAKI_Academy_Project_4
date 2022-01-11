const patientsModel = require("../database/models/patientsSchema");

const createNewPatient = (req, res) => {
  const { firstName, lastName, age, country, phone } = req.body;
  const patient = new patientsModel({
    firstName,
    lastName,
    age,
    country,
    phone,
    doctor: req.token.doctorId,
  });

  patient
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Patient created",
        patient: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};

const getAllPatients = (req, res) => {
  const doctorId = req.token.doctorId;
  patientsModel
    .find({})
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "All the patients",
          doctorId: doctorId,
          patient: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "No Patients Yet",
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

const deletePatientById = (req, res) => {
    const id = req.params.id;
    patientsModel.findByIdAndDelete(id).then((result) => {
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `The Patient: ${id} is not found`,
            });
        }
        res.status(200).json({
            success: true,
            message: `Succeeded to delete patient with id: ${id}`,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
        });
    })
}

module.exports = {
  createNewPatient,
  getAllPatients,
  deletePatientById,
};
