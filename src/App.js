import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Use HashRouter for GitHub Pages
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

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
