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
  const [status, setStatus] = useState(false);

  const getDiagnosisById = () => {
    axios
      .get(`http://localhost:5000/patients/diagnosis`, {
        params: { _id: patientId },
      })
      .then((response) => {
        setDiagnosiss(response.data.diagnosiss);
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="searchDiv">
        <input
          className="inputSearch"
          type="text"
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
              <p className="titleInfo">Patient Information:</p>
              {patient.map((element, index) => {
                return (
                  <div className="dataOfPatient">
                    <div className="divPara">
                      <p className="title">- Name: </p>
                      <p className="Info">{element.fullName}</p>
                    </div>
                    <div className="divPara">
                      <p className="title">- Phone Number: </p>
                      <p className="Info">{element.phone}</p>
                    </div>
                    <div className="divPara">
                      <p className="title">- Medical History: </p>
                      <p className="Info">{element.medicalHistory}</p>
                    </div>
                    <div className="divPara">
                      <p className="title">- Allergy: </p>
                      <p className="Info">{element.allergy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="diagnosisDiv">
              <table className="tableDiag">
                <thead>
                  <tr>
                    <th className="thDate">Date</th>
                    <th className="thDiag">Diagnosis</th>
                    <th className="thDiag">Management</th>
                    <th className="thDiag">Total Amount</th>
                    <th className="thDiag">Doctor Sign</th>
                    <th className="thActions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnosiss.map((element, index) => {
                    return (
                      <tr>
                        <td className="tdDate">
                          {element.dateOfVisit.split("").slice(0, 10).join("")}
                        </td>
                        <td className="tdDiag">{element.diagnosis}</td>
                        <td className="tdDiag">{element.management}</td>
                        <td className="tdDiag">{element.totalAmount}</td>
                        <td className="tdDiag">{element.doctorSign}</td>
                        <td className="tdActions">
                          <button
                            className="btnDeleteD"
                            onClick={() => {
                              axios
                                .delete(
                                  `http://localhost:5000/patients/${element._id}/diagnosis`
                                )
                                .then((response) => {
                                  getDiagnosisById();
                                })
                                .catch((err) => {});
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="tdDate"></td>
                    <td className="tdDiag">
                      <input
                        className="inputDiag"
                        type="text"
                        value={newDiagnosis}
                        placeholder="Diagnosis ..."
                        onChange={(e) => {
                          setNewDiagnosis(e.target.value);
                        }}
                      />
                    </td>
                    <td className="tdDiag">
                      <input
                        className="inputDiag"
                        type="text"
                        value={newManagement}
                        placeholder="Management ..."
                        onChange={(e) => {
                          setNewManagement(e.target.value);
                        }}
                      />
                    </td>
                    <td className="tdDiag">
                      <input
                        className="inputDiag"
                        type="text"
                        value={newAmount}
                        placeholder="Total Amount ..."
                        onChange={(e) => {
                          setNewAmount(e.target.value);
                        }}
                      />
                    </td>
                    <td className="tdDiag">
                      <input
                        className="inputDiag"
                        type="text"
                        value={newDoctorSign}
                        placeholder="Doctor's Signature ..."
                        onChange={(e) => {
                          setNewDoctorSign(e.target.value);
                        }}
                      />
                    </td>
                    <td className="tdActions">
                      <button
                        className="btnAddD"
                        onClick={() => {
                          setNewDiagnosis("");
                          setNewManagement("");
                          setNewAmount("");
                          setNewDoctorSign("");
                          axios
                            .post(
                              `http://localhost:5000/patients/${patientId}/diagnosis`,

                              {
                                diagnosis: newDiagnosis,
                                management: newManagement,
                                totalAmount: newAmount,
                                doctorSign: newDoctorSign,
                              },
                              { headers: { Authorization: `Bearer ${token}` } }
                            )
                            .then((response) => {
                              getDiagnosisById();
                            })
                            .catch((err) => {
                            });
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
      {status
        ? message && <div className="SuccessMessageS">{message}</div>
        : message && <div className="ErrorMessageS">{message}</div>}
    </>
  );
};

export default Diagnosis;
