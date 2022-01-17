import "./PatientList.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/DoctorContext";

const PatientList = () => {
  const { token } = useContext(AuthContext);

  const [allPatients, setAllPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("");

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [allergy, setAllergy] = useState("");

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
  });

  //==========================================================================

  return (
    <>
      <div className="mainDiv">
        <div className="header_PList">
          <i class="fad fa-clipboard-list-check" id="list"></i>
          <p className="paraList">Patient List</p>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th className="thName">Full Name</th>
                <th>Birth Date</th>
                <th className="thGender">Gender</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Medical History</th>
                <th className="thAllergy">Allergy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPatients.map((element, index) => {
                return (
                  <tr key={index}>
                    {isClicked ? (
                      <>
                        <td>
                          <input
                            defaultValue={element.fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input type="date"
                            defaultValue={element.dateOfBirth}
                            onChange={(e) => {
                              setDateOfBirth(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            defaultValue={element.gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            defaultValue={element.address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            defaultValue={element.phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            defaultValue={element.medicalHistory}
                            onChange={(e) => {
                              setMedicalHistory(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            defaultValue={element.allergy}
                            onChange={(e) => {
                              setAllergy(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              axios
                                .patch(
                                  `http://localhost:5000/patients/${element._id}`,
                                  {
                                    fullName,
                                    dateOfBirth,
                                    gender,
                                    address,
                                    phone,
                                    medicalHistory,
                                    allergy,
                                  }
                                )
                                .then((response) => {
                                  console.log(response);
                                  getAllPatients();
                                  setIsClicked(false);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <button
                            className="btnName"
                            value={element.fullName}
                            onClick={(e) => {
                              setName(e.target.value);
                            }}
                          >
                            {element.fullName}
                          </button>
                        </td>
                        <td>{element.dateOfBirth}</td>
                        <td className="tdGender">{element.gender}</td>
                        <td>{element.address}</td>
                        <td>{element.phone}</td>
                        <td>{element.medicalHistory}</td>
                        <td className="thAllergy">{element.allergy}</td>

                        <td key={index} className="tdActions">
                          <button
                            className="btnEdit"
                            onClick={() => {
                              setIsClicked(true);
                              setFullName(element.fullName);
                              setDateOfBirth(element.dateOfBirth);
                              setGender(element.gender);
                              setAddress(element.address);
                              setPhone(element.phone);
                              setMedicalHistory(element.medicalHistory);
                              setAllergy(element.allergy);
                              console.log(element._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btnDelete"
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
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p>{message}</p>
    </>
  );
};

export default PatientList;
