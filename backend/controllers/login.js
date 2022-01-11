const doctorsModel = require("../database/models/doctorsSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    doctorsModel.findOne({email}).then(async(result) => {
        if (!result) {
            return res.status(404).json({
              success: false,
              message: `The email doesn't exist`,
            });
          }
          try {
            const valid = await bcrypt.compare(password, result.password);
            if (!valid) {
              return res.status(403).json({
                success: false,
                message: `The password you’ve entered is incorrect`,
              });
            }
            const payload = {
              doctorId: result._id,
              doctorName: result.firstName,
            };
    
            const options = {
              expiresIn: "60m",
            };
            const token = await jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              token: token,
            });
          } catch (error) {
            throw new Error(error.message);
          }
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        });
    };
    
    module.exports = {
      login,
    };
    