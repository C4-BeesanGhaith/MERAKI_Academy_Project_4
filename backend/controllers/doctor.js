const doctorsModel = require("../database/models/doctorsSchema");

// This function creates a new doctor
const createNewDoctor = (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    age,
    postTitle,
    phone,
    email,
    password,
  } = req.body;

  const doctor = new doctorsModel({
    firstName,
    lastName,
    dateOfBirth,
    age,
    postTitle,
    phone,
    email,
    password,
  });

  doctor
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          success: true,
          message: "Success Doctor Added",
          doctor: result,
        });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  createNewDoctor,
};
