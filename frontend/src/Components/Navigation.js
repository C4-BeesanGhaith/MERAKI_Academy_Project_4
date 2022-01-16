import "./Navigation.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/DoctorContext";

const Navigation = () => {
  // data I need to pass from context file
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="header">
      <i class="fas fa-users-medical" id="pic"></i>
        <p className="paraTitle">FAMILY</p><p className="paraTitle2">CLINIC</p>
        {isLoggedIn ? (
          <>
            <div className="links">
              <Link to="/about" className="link">
                About Us
              </Link>
              <Link to="/patients">Patient List</Link>
              <Link to="/new">New</Link>
              <Link to="/diagnosis">Diagnosis Page</Link>
            </div>
          </>
        ) : (
          <>
            <div className="links">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;
