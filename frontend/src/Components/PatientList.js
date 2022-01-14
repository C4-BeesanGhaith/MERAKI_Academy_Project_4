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
        setMessage("");
        setAllPatients(response.data.patient);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  // ===============================================================================
  useEffect(() => {
    getAllPatients();
  }, []);

  //==========================================================================

  return (
    <>
      <div className="mainDiv">
        <div>
          <h1>Patient List</h1>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Birth Date</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Medical History</th>
                <th>Allergy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPatients.map((element, index) => {
                return (
                  <tr>
                    <td>{element.fullName}</td>
                    <td>{element.dateOfBirth}</td>
                    <td>{element.gender}</td>
                    <td>{element.address}</td>
                    <td>{element.phone}</td>
                    <td>{element.medicalHistory}</td>
                    <td>{element.allergy}</td>
                    <td>
                      <button>Edit</button>
                      <button
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:5000/patients/${element._id}`
                            )
                            .then((response) => {
                              console.log(response);
                              getAllPatients();
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientList;
