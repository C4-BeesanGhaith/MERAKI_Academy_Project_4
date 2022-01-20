import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

const LoginProvider = (props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveToken = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  const state = { token, saveToken, setIsLoggedIn, isLoggedIn, logout };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default LoginProvider;
