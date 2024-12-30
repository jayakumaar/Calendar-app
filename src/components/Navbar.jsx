// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/reporting">Reporting</Link></li>
        <li><Link to="/company-management">Company Management</Link></li>
        <li><Link to="/communication-method-management">Communication Method Management</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
