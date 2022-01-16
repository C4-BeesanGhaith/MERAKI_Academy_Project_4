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
                  <tr>
                    {isClicked ? (
                      <>
                        <td>
                          <input value={element.fullName}/>
                        </td>
                        <td>
                          <input type={"date"} value={element.dataOfBirth}/>
                        </td>
                        <td>
                          <input value={element.gender}/>
                        </td>
                        <td>
                          <input value={element.address}/>
                        </td>
                        <td>
                          <input value={element.phone}/>
                        </td>
                        <td>
                          <input value={element.medicalHistory}/>
                        </td>
                        <td>
                          <input value={element.allergy}/>
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
                      </>
                    )}
                    <td className="tdActions">
                      <button
                        className="btnEdit"
                      
                        onClick={() => {
                          setIsClicked(true);

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
