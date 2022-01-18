import "./Diagnosis.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/DoctorContext";

const Diagnosis = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [patient, setPatient] = useState([]);
  const [message, setMessage] = useState("");
  const [diagnosiss, setDiagnosiss] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [patientId, setPatientId] = useState();

  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newManagement, setNewManagement] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDoctorSign, setNewDoctorSign] = useState("");


  const getDiagnosisById = () => {
      axios.get(`http://localhost:5000/patients/diagnosis`, {
          params:{_id: patientId}
      }).then((response) => {
          setDiagnosiss(response.data.diagnosiss)
      }).catch((err) => {
          console.log(err.response.data)
      })
  }

  return (
    <>
      <div className="searchDiv">
        <input
          type={"text"}
          placeholder="Search ..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <i
          class="fas fa-search"
          id="search"
          onClick={() => {
            axios
              .get("http://localhost:5000/patients/search", {
                params: { fullName: name },
              })
              .then((response) => {
                setMessage("");
                setIsSearch(true);
                setPatient(response.data.patient);
                setDiagnosiss(response.data.patient[0].diagnosiss);
                setPatientId(response.data.patient[0]._id);
                // getDiagnosisById();
              })
              .catch((err) => {
                setMessage(err.response.data.message);
              });
          }}
        ></i>
      </div>
      <br />
      {isSearch ? (
        <>
          <div className="containerDiv">
            <div className="profileDiv">
              {patient.map((element, index) => {
                return (
                  <div>
                    <p>Full Name: {element.fullName}</p>
                    <p>Birth Date: {element.dateOfBirth}</p>
                    <p>Gender: {element.gender}</p>
                    <p>Address: {element.address}</p>
                    <p>Phone Number: {element.phone}</p>
                    <p>Medical History: {element.medicalHistory}</p>
                    <p>Allergy: {element.allergy}</p>
                  </div>
                );
              })}
            </div>
            <div className="diagnosisDiv">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Management</th>
                    <th>Total Amount</th>
                    <th>Doctor Sign</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosiss.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.dateOfVisit}</td>
                        <td>{element.diagnosis}</td>
                        <td>{element.management}</td>
                        <td>{element.totalAmount}</td>
                        <td>{element.doctorSign}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type={"text"}
                        placeholder="Diagnosis ..."
                        onChange={(e) => {
                          setNewDiagnosis(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type={"text"}
                        placeholder="Management ..."
                        onChange={(e) => {
                          setNewManagement(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type={"text"}
                        placeholder="Total Amount ..."
                        onChange={(e) => {
                          setNewAmount(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type={"text"}
                        placeholder="Doctor's Signature ..."
                        onChange={(e) => {
                          setNewDoctorSign(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          axios.post(
                            `http://localhost:5000/patients/${patientId}/diagnosis`,
                            
                            {
                              diagnosis: newDiagnosis,
                              management: newManagement,
                              totalAmount: newAmount,
                              doctorSign: newDoctorSign,
                            },
                            { headers: { Authorization: `Bearer ${token}` }, },
                          ).then((response) => {
                              console.log(response.data.diagnosis)
                              console.log(diagnosiss)
                              getDiagnosisById();
                          }).catch((err) => {
                              console.log(err.response.data)
                          })
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {message && <p>{message}</p>}
    </>
  );
};

export default Diagnosis;
