import "./Register.css";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [postTitle, setPostTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const createNewDoctor = () => {
    axios
      .post("http://localhost:5000/doctors/", {
        firstName,
        lastName,
        age,
        postTitle,
        phone,
        email,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <div className="registerDiv">
        <p className="paraReg">Register</p>
        <br />
        <label className="lblRegister">First Name:</label>
        <input
          className="inputRegister"
          type="text"
          placeholder="First Name ..."
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Last Name:</label>
        <input
          className="inputRegister"
          type="text"
          placeholder="Last Name ..."
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Age:</label>
        <input
          className="inputRegister"
          type="number"
          placeholder="Age ..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Post Title:</label>
        <input
          className="inputRegister"
          type="text"
          placeholder="Post Title ..."
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Phone Number:</label>
        <input
          className="inputRegister"
          type="text"
          placeholder="Phone Number ..."
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Email:</label>
        <input
          className="inputRegister"
          type="text"
          placeholder="Email ..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label className="lblRegister">Password:</label>
        <input
          className="inputRegister"
          type="password"
          placeholder="Password ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button className="btnRegister" onClick={createNewDoctor}>
          Register
        </button>
        {message && <p className="messageRegister">{message}</p>}
      </div>
    </>
  );
};

export default Register;
