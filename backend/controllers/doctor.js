const doctorsModel = require("../database/models/doctorsSchema");

// This function creates a new doctor
const createNewDoctor = (req, res) => {
    const {firstName, lastName, age, postTitle, phone, email, password} = req.body;

    const doctor = new doctorsModel({
        firstName,
        lastName,
        age,
        postTitle,
        phone,
        email,
        password,
    });
    
    doctor.save().then((result) => {
        res.status(201).json({success: true, message: "Success Doctor Added", doctor: result});
    }).catch((err) => {
        
    });
};

module.exports={
    createNewDoctor,
}