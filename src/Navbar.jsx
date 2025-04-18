import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="hotel">🏨</span> Naya Hotel
      </div>
      <div className="navbar-user">
        Welcome, <span className="navbar-username">{name}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
