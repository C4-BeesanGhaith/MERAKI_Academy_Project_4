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

  return (
    <>
      <div>
        <h1>Add New Patient</h1>
      </div>
      <div>
        <p>Patient Information</p>
        <label>Full Name</label>
        <input
          type={"text"}
          placeholder="Full Name ..."
          onChange={(e) => {
            return setFullName(e.target.value);
          }}
        />
        <br />
        <label>Date Birth</label>
        <input
          type={"date"}
          placeholder="Date Of Birth ..."
          onChange={(e) => {
            return setDateOfBirth(e.target.value);
          }}
        />
        <br />
        <label>Age</label>
        <input
          type={"number"}
          placeholder="Age ..."
          onChange={(e) => {
            return setAge(e.target.value);
          }}
        />
        <br />
        <label>Gender</label>
        <input
          type={"radio"}
          name="gender"
          value={"Femail"}
          onChange={(e) => {
            return setGender(e.target.value);
          }}
        />
        <label>Femail</label>
        <input
          type={"radio"}
          name="gender"
          value={"Mail"}
          onChange={(e) => {
            return setGender(e.target.value);
          }}
        />
        <label>Mail</label>
        <br />
        <label>Address</label>
        <input
          type={"text"}
          placeholder="Address ..."
          onChange={(e) => {
            return setAddress(e.target.value);
          }}
        />
        <br />
        <label>Phone Number</label>
        <input
          type={"text"}
          placeholder="Phone Number ..."
          onChange={(e) => {
            return setPhone(e.target.value);
          }}
        />
        <br />
        <p>Medical Information</p>
        <label>Medical History</label>
        <input
          type={"checkbox"}
          name="medicalHistory"
          value={"Diabetes"}
          onChange={(e) => {
            return setMedicalHistory(e.target.value);
          }}
        />
        <label>Diabetes</label>
        <input
          type={"checkbox"}
          name="medicalHistory"
          value={"Hypertension"}
          onChange={(e) => {
            return setMedicalHistory(e.target.value);
          }}
        />
        <label>Hypertension</label>
        <br />
        <label>Allergy</label>
        <select
          onChange={(e) => {
            console.log(allergy);
            return setAllergy(e.target.value);
          }}
        >
          <option value={"Yes"}>Yes</option>
          <option value={"No"}>No</option>
        </select>
        <br />
        <button
          onClick={() => {
            axios.post(
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
            ).then((response) => {
                setMessage(response.data.message);
            }).catch((err) => {
                setMessage(err.response.data.message);
            });
          }}
        >
          Submit
        </button>
      </div>
      {message && <p>{message}</p>}
    </>
  );
};

export default NewPatient;
