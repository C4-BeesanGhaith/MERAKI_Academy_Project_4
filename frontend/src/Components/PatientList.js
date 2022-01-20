import "./PatientList.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/DoctorContext";

const PatientList = () => {
  const { token } = useContext(AuthContext);

  const [allPatients, setAllPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
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
      {allPatients ? (
        <>
          <div className="mainDiv">
            <div className="header_PList">
              <i class="fad fa-clipboard-list-check" id="list"></i>
              <p className="paraList">Patient List</p>
            </div>
            <div>
              <table className="tableList">
                <thead>
                  <tr>
                    <th className="thName">Full Name</th>
                    <th className="thList">Birth Date</th>
                    <th className="thGender">Gender</th>
                    <th className="thList">Address</th>
                    <th className="thList">Phone Number</th>
                    <th className="thList">Medical History</th>
                    <th className="thAllergy">Allergy</th>
                    <th className="thList">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allPatients.map((element, index) => {
                    return (
                      <tr key={index}>
                        {isClicked ? (
                          <>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.fullName}
                                onChange={(e) => {
                                  setFullName(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                type="date"
                                className="inputUpdate"
                                defaultValue={element.dateOfBirth}
                                onChange={(e) => {
                                  setDateOfBirth(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.phone}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.medicalHistory}
                                onChange={(e) => {
                                  setMedicalHistory(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <input
                                className="inputUpdate"
                                defaultValue={element.allergy}
                                onChange={(e) => {
                                  setAllergy(e.target.value);
                                }}
                              />
                            </td>
                            <td className="tdList">
                              <button
                                className="btnUpdate"
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
                                      getAllPatients();
                                      setIsClicked(false);
                                    })
                                    .catch((err) => {
                                    });
                                }}
                              >
                                Update
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="tdList">{element.fullName}</td>
                            <td className="tdList">{element.dateOfBirth}</td>
                            <td className="tdGender">{element.gender}</td>
                            <td className="tdList">{element.address}</td>
                            <td className="tdList">{element.phone}</td>
                            <td className="tdList">{element.medicalHistory}</td>
                            <td className="tdAllergy">{element.allergy}</td>

                            <td key={index} className="tdList">
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
                                      getAllPatients();
                                    })
                                    .catch((err) => {
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
        </>
      ) : (
        <>
          <div className="mainDiv">
            <div className="header_PList">
              <i class="fad fa-clipboard-list-check" id="list"></i>
              <p className="paraList">Patient List</p>
            </div>
            <div>
              <table className="tableList">
                <thead>
                  <tr>
                    <th className="thName">Full Name</th>
                    <th className="thList">Birth Date</th>
                    <th className="thGender">Gender</th>
                    <th className="thList">Address</th>
                    <th className="thList">Phone Number</th>
                    <th className="thList">Medical History</th>
                    <th className="thAllergy">Allergy</th>
                    <th className="thList">Actions</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientList;
