const patientsModel = require("../database/models/patientsSchema");
const diagnosisModel = require("../database/models/diagnosisSchema");

const createNewDiagnosis = (req, res) => {
    const patientId = req.params.id;
    const {dateOfVisit, diagnosis, management} = req.body;

    const diagnosis = new diagnosisModel({
        dateOfVisit,
        diagnosis,
        management,
    });

    diagnosis.save().then((result) => {
        
    })
}

module.exports = {
    createNewDiagnosis,
}