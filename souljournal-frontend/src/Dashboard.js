import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-buttons">
        <Link to="/create-entry" className="dashboard-button">Create Entry</Link>
        <Link to="/manage-entries" className="dashboard-button">Manage Entries</Link>
        <Link to="/quotes" className="dashboard-button">Quotes</Link>
        <Link to="/settings" className="dashboard-button">Settings</Link>
      </div>
    </div>
  );
};

export default Dashboard;