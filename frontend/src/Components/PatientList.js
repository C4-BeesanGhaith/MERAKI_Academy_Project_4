import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/DoctorContext";

const PatientList = () => {
  const { token } = useContext(AuthContext);

  const [allPatients, setAllPatients] = useState([]);
  const [message, setMessage] = useState("");

  // function to get all patients from database
  const getAllPatients = () => {
    axios
      .get("http://localhost:5000/patients/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setMessage("");
        setAllPatients(response.data.patient);
        console.log(allPatients);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Medical History</th>
              <th>Allergy</th>
            </tr>
          </thead>
          <tbody>
            {allPatients.map((element, index) => {
              return (
                <tr>
                  <td>{element.fullName}</td>
                  <td>{element.dateOfBirth}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientList;
