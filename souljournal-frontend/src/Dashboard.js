import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Retrieve the email from localStorage
    const email = localStorage.getItem('userEmail');

    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3300/user/details?email=${email}`);
        const data = await response.json();
        setFirstName(data.firstName);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome back, {firstName}!</h1>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-buttons">
        <Link to="/new-entry" className="dashboard-button">Create Entry</Link>
        <Link to="/manage-entries" className="dashboard-button">Manage Entries</Link>
        <Link to="/quotes" className="dashboard-button">Quotes</Link>
        <Link to="/settings" className="dashboard-button">Settings</Link>
      </div>
    </div>
  );
};

export default Dashboard;