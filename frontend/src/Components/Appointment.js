import "./Appointment.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Appointment = () => {
  const [allAppointment, setAllAppointment] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const getAllAppointment = () => {
    axios
      .get("http://localhost:5000/appointment/")
      .then((response) => {
        setAllAppointment(response.data.appointment);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllAppointment();
  });

  return (
    <>
      {allAppointment ? (
        <>
          <div className="mainDivApp">
            <div className="headerAppoin">
              <i class="fad fa-calendar-check" id="appPic"></i>
              <p className="paraAppoin">Appointment List</p>
            </div>
            <div className="tableDiv">
              <table className="tableAppoin">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Mobile</th>
                    <th>Doctor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointment.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>{element.appointmentDate}</td>
                        <td>{element.appointmentTime}</td>
                        <td>{element.patient}</td>
                        <td>{element.phone}</td>
                        <td>{element.doctor}</td>
                        <td>
                          <button
                            className="btnAppoinDelete"
                            onClick={() => {
                              axios
                                .delete(
                                  `http://localhost:5000/appointment/${element._id}`
                                )
                                .then((response) => {
                                  getAllAppointment();
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
                    <td>
                      <input
                        className="inputAppoin"
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => {
                          setAppointmentDate(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => {
                          setAppointmentTime(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={patient}
                        placeholder="Patient Name ..."
                        onChange={(e) => {
                          setPatient(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={phone}
                        placeholder="Mobile Number ..."
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={doctor}
                        placeholder="Doctor Name ..."
                        onChange={(e) => {
                          setDoctor(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <button
                        className="btnAppoinAdd"
                        onClick={() => {
                          setPatient("");
                          setDoctor("");
                          setAppointmentDate("");
                          setAppointmentTime("");
                          setPhone("");
                          axios
                            .post("http://localhost:5000/appointment/", {
                              patient,
                              doctor,
                              phone,
                              appointmentDate,
                              appointmentTime,
                            })
                            .then((response) => {
                              getAllAppointment();
                              console.log(patient);
                            })
                            .catch((err) => {});
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
        <>
          <div className="mainDivApp">
            <div className="headerAppoin">
              <i class="fad fa-calendar-check" id="appPic"></i>
              <p className="paraAppoin">Appointment List</p>
            </div>
            <div className="tableDiv">
              <table className="tableAppoin">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Mobile</th>
                    <th>Doctor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                  <tr>
                    <td>
                      <input
                        className="inputAppoin"
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => {
                          setAppointmentDate(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => {
                          setAppointmentTime(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={patient}
                        placeholder="Patient Name ..."
                        onChange={(e) => {
                          setPatient(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={phone}
                        placeholder="Mobile Number ..."
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <input
                        className="inputAppoin"
                        type="text"
                        value={doctor}
                        placeholder="Doctor Name ..."
                        onChange={(e) => {
                          setDoctor(e.target.value);
                        }}
                      ></input>
                    </td>
                    <td>
                      <button
                        className="btnAppoinAdd"
                        onClick={() => {
                          setPatient("");
                          setDoctor("");
                          setAppointmentDate("");
                          setAppointmentTime("");
                          setPhone("");
                          axios
                            .post("http://localhost:5000/appointment/", {
                              patient,
                              doctor,
                              phone,
                              appointmentDate,
                              appointmentTime,
                            })
                            .then((response) => {
                              getAllAppointment();
                            })
                            .catch((err) => {});
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
      )}
    </>
  );
};

export default Appointment;
