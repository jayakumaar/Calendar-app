// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ReportingPage from './pages/ReportingPage';
import CompanyManagement from './components/CompanyManagement'; // Import CompanyManagement
import CommunicationMethodManagement from './components/CommunicationMethodManagement'; // Import CommunicationMethodManagement
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/reporting" element={<ReportingPage />} />

          {/* Add route for Company Management and Communication Method Management */}
          <Route path="/company-management" element={<CompanyManagement />} />
          <Route path="/communication-method-management" element={<CommunicationMethodManagement />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
