import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Navbar.css"; // Ensure the correct path to the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/reporting">Reporting</Link>
          </li>
       
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
