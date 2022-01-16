const patientsModel = require("../database/models/patientsSchema");

const createNewPatient = (req, res) => {
  const { fullName, dateOfBirth, age, gender, address, phone, medicalHistory, allergy } = req.body;
  const patient = new patientsModel({
    fullName,
    dateOfBirth,
    age,
    gender,
    address,
    phone,
    medicalHistory,
    allergy,
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
    .populate("diagnosiss")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "All the patients",
          doctorId: doctorId,
          patient: result,
          diagnosiss: result.diagnosiss,
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

const getPatientByName = (req, res) => {
  const name = req.query.fullName;

  patientsModel
    .find({ fullName: name })
    .populate("diagnosiss")
    .then((result) => {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `The Patient: ${name} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the patient for the name: ${name}`,
        patient: result,
        diagnosiss: result.diagnosiss,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const deletePatientById = (req, res) => {
  const id = req.params.id;
  patientsModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Patient: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete patient with id: ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const updatePatientById = (req, res) => {
  const id = req.params.id;

  patientsModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Patient: ${id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Patient Update`,
        patient: result,
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
  createNewPatient,
  getAllPatients,
  getPatientByName,
  deletePatientById,
  updatePatientById,
};
