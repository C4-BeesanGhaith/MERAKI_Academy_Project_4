import "./NewPatient.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/DoctorContext";

const NewPatient = () => {
  const { token } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [allergy, setAllergy] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  return (
    <>
      <div className="mainAddDiv">
        <div className="addNewPatientDiv">
          <i class="fas fa-users-medical" id="picAdd"></i>
          <p className="paraAdd">Add New Patient</p>
        </div>
        <div className="informationDiv">
          <div className="patientInfoDiv">
            <p className="paraInfo">- Patient Information</p>
            <div className="inputDiv">
              <label>Full Name:</label>
              <input
                className="inputAdd"
                type="text"
                placeholder="Full Name ..."
                onChange={(e) => {
                  return setFullName(e.target.value);
                }}
              />
              <label>Date Birth:</label>
              <input
                className="inputAdd"
                type="date"
                placeholder="Date Of Birth ..."
                onChange={(e) => {
                  return setDateOfBirth(e.target.value);
                }}
              />
              <label>Age:</label>
              <input
                className="inputAdd"
                type="number"
                placeholder="Age ..."
                onChange={(e) => {
                  return setAge(dateOfBirth-Date.now());
                }}
              />
              <label>Gender:</label>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Femail"
                  onChange={(e) => {
                    return setGender(e.target.value);
                  }}
                />
                <label>Femail</label>
                <input
                  className="radioAdd"
                  type="radio"
                  name="gender"
                  value="Mail"
                  onChange={(e) => {
                    return setGender(e.target.value);
                  }}
                />
                <label>Mail</label>
              </div>
              <label>Address:</label>
              <input
                className="inputAdd"
                type="text"
                placeholder="Address ..."
                onChange={(e) => {
                  return setAddress(e.target.value);
                }}
              />
              <label>Phone Number:</label>
              <input
                className="inputAdd"
                type="text"
                placeholder="Phone Number ..."
                onChange={(e) => {
                  return setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <div className="patientInfoDiv">
            <p className="paraInfo">- Medical Information</p>
            <div className="inputDiv_2">
              <label>Medical History:</label>
              <div className="checkboxDiv">
                <input
                  type="checkbox"
                  name="medicalHistory"
                  value="Diabetes"
                  onChange={(e) => {
                    return setMedicalHistory(e.target.value);
                  }}
                />
                <label>Diabetes</label>
                <input
                  className="box2"
                  type="checkbox"
                  name="medicalHistory"
                  value="Hypertension"
                  onChange={(e) => {
                    return setMedicalHistory(e.target.value);
                  }}
                />
                <label>Hypertension</label>
                <input
                  className="box2"
                  type="checkbox"
                  name="medicalHistory"
                  value="Asthma"
                  onChange={(e) => {
                    return setMedicalHistory(e.target.value);
                  }}
                />
                <label>Asthma</label>
                <input
                  className="box2"
                  type="checkbox"
                  name="medicalHistory"
                  value="Drug Allergy"
                  onChange={(e) => {
                    return setMedicalHistory(e.target.value);
                  }}
                />
                <label>Drug Allergy</label>
                <input
                  className="box2"
                  type="checkbox"
                  name="medicalHistory"
                  value="Nothing"
                  onChange={(e) => {
                    return setMedicalHistory(e.target.value);
                  }}
                />
                <label>Nothing</label>
              </div>
              <label>Allergy:</label>
              <div>
                <input
                  type="radio"
                  name="allergy"
                  value="Yes"
                  onChange={(e) => {
                    return setAllergy(e.target.value);
                  }}
                />
                <label>Yes</label>
                <input
                  className="radioAdd"
                  type="radio"
                  name="allergy"
                  value="No"
                  onChange={(e) => {
                    return setAllergy(e.target.value);
                  }}
                />
                <label>No</label>
              </div>
              <br />
            </div>
          </div>
            <button
              className="btnAdd"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:5000/patients/",
                    {
                      fullName,
                      dateOfBirth,
                      age,
                      gender,
                      address,
                      phone,
                      medicalHistory,
                      allergy,
                    },
                    {
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((response) => {
                    setMessage(response.data.message);
                    setStatus(true);
                  })
                  .catch((err) => {
                    setMessage(err.response.data.message);
                    setStatus(false);
                  });
              }}
            >
              Submit
            </button>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default NewPatient;
