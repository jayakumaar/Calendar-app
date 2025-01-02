import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ReportingPage from './pages/ReportingPage';
import CompanyManagement from './components/CompanyManagement';
import CommunicationMethodManagement from './components/CommunicationMethodManagement';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/reporting" element={<ReportingPage />} />
          <Route path="/company-management" element={<CompanyManagement />} />
          <Route path="/communication-method-management" element={<CommunicationMethodManagement />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
