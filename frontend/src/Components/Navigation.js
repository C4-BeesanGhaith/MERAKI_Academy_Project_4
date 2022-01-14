import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/DoctorContext";

const Navigation = () => {
  // data I need to pass from context file
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div>
        {isLoggedIn ? (
          <>
            <div className="navigation">
              <Link to="/about">About Us</Link>
              <Link to="/patients">Patient List</Link>
              <Link to="/new">New</Link>
              <Link to="/open">Open</Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navigation;
