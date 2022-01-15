import "./Login.css";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // data I need to pass it from Context folder / DoctorContext using (useContext) method
  const { setIsLoggedIn, saveToken, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // function Login
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login/", {
        email,
        password,
      });
      if (res.data.success) {
        saveToken(res.data.token);
        console.log(res.data.token);
        setIsLoggedIn(true);
        setMessage("");
      } else throw Error;
    } catch (err) {
      if (err.response && err.response.data) {
        return setMessage(err.response.data.message);
      }
      setMessage("Error happened while Login, Please try again");
    }
  };

  //==============================================================================

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/about");
    }
  });

  //================================================================================

  return (
    <>
      <div className="loginDiv">
        <p className="paraLogin">Login</p>
        <br />
        <label className="lblLogin">Email:</label>
        <br/>
        <input className="inputLogin"
          type={"text"}
          placeholder="Email ..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label className="lblLogin">Password:</label>
        <br/>
        <input className="inputLogin"
          type={"password"}
          placeholder="Password ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button className="btnLogin" onClick={login}>Login</button>
        {message && <p className="messageLogin">{message}</p>}
      </div>
    </>
  );
};

export default Login;
