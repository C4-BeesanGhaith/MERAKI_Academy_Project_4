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
      <i class="fas fa-hospital-user" id="pic"></i>
      {/* <i class="fas fa-user-md" id="pic"></i> */}
        <p className="paraTitle">FAMILY</p><p className="paraTitle2">CLINIC</p>
        {isLoggedIn ? (
          <>
            <div className="links">
              <Link to="/about" className="link">
                About Us
              </Link>
              <div><i class="fad fa-clipboard-list-check" id="listPic"></i>
              <Link to="/patients" className="link">Patient List</Link></div>
              <div>
                <i class="fas fa-users-medical" id="listPic"></i>
                <Link to="/new" className="link">Add New Patient</Link>
                </div>
                <div>
                <i class="far fa-user-md-chat" id="listPic"></i>
                <Link to="/diagnosis" className="link">Diagnosis Page</Link>
                </div>
            </div>
          </>
        ) : (
          <>
            <div className="links">
              <Link to="/register" className="link">Register</Link>
              <Link to="/login" className="link">Login</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;
