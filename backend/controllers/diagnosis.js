const patientsModel = require("../database/models/patientsSchema");
const diagnosisModel = require("../database/models/diagnosisSchema");

const createNewDiagnosis = (req, res) => {
    const patientId = req.params.id;
    const {dateOfVisit, diagnosis, management} = req.body;

    const newDiagnosis = new diagnosisModel({
        dateOfVisit,
        diagnosis,
        management,
        doctor: req.token.doctorId,
    });

    newDiagnosis.save().then((result) => {
        patientsModel.updateOne({_id: patientId}, {$push: {diagnosiss: result._id}}).then(() => {
            res.status(201).json({
                success: true,
                message: `The new diagnosis added`,
                diagnosis: result
            });
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
            });
        });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
        });
    });
};

module.exports = {
    createNewDiagnosis,
}