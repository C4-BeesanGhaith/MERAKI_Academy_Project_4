const patientsModel = require("../database/models/patientsSchema");
const diagnosisModel = require("../database/models/diagnosisSchema");

const createNewDiagnosis = (req, res) => {
  const patientId = req.params.id;
  const { dateOfVisit, diagnosis, management, totalAmount, doctorSign } =
    req.body;

  const newDiagnosis = new diagnosisModel({
    dateOfVisit,
    diagnosis,
    management,
    totalAmount,
    doctorSign,
    doctor: req.token.doctorId,
  });

  newDiagnosis
    .save()
    .then((result) => {
      patientsModel
        .updateOne({ _id: patientId }, { $push: { diagnosiss: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The new diagnosis added`,
            diagnosis: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const getDiagnosisById = (req, res) => {
  const id = req.query._id;
  patientsModel
    .find({_id: id}).populate("diagnosiss")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All The Diagnosis to Patient`,
          diagnosiss: result[0].diagnosiss,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Diagnosis Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const deleteDiagnosis = (req, res) => {
  const id = req.params.id;
  diagnosisModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Diagnosis: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete Diagnosis with id: ${id}`,
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
  createNewDiagnosis,
  deleteDiagnosis,
  getDiagnosisById,
};
