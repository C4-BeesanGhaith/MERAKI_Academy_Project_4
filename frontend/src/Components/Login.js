import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/DoctorContext";

const Login = () => {
  // data I need to pass it from Context folder / doctorContext using (useContext) method
  const { setIsLoggedIn, saveToken, isLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login/", {
        email,
        password,
      });
      if (res.data.success) {
        saveToken(res.data.token);
        console.log(res.data.token)
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

  return (
    <>
      <div>
        <p>Login</p>
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
        <button onClick={login}>Login</button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
