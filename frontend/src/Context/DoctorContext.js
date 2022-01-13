import React, { useState } from "react";

export const AuthContext = React.createContext();

const LoginProvider = (props) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveToken = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const state = { token, saveToken, setIsLoggedIn, isLoggedIn };

  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default LoginProvider;