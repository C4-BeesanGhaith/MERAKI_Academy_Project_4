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
        console.log(response.data)
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
    <div>
      <p>Register</p>
        <br />
        <input
          type={"text"}
          placeholder="First Name ..."
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <br />
        <input
          type={"text"}
          placeholder="Last Name ..."
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br />
        <input
          type={"number"}
          placeholder="Age ..."
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <input
          type={"text"}
          placeholder="Post Title ..."
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <br />
        <input
          type={"text"}
          placeholder="Phone Number ..."
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <input
          type={"text"}
          placeholder="Email ..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type={"text"}
          placeholder="Password ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button onClick={createNewDoctor}>Register</button>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Register;
