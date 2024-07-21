import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Retrieve the email from localStorage
    const email = localStorage.getItem('userEmail');

    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3300/user/details?email=${email}`);
        const data = await response.json();
        console.log('User data:', data); // Log the response data

        setFirstName(data.firstName);
        setLastName(data.lastName);

        // Save firstName and lastName to localStorage
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    // Log the state values to verify they are being set correctly
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
  }, [firstName, lastName]);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 slide-down">
      <div className="row w-100 justify-content-center text-center">
        <h1 className="mb-4">Welcome back, {firstName}!</h1>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/new-entry" className="btn btn-primary w-100 fs-5 fs-lg-4 dashboard-button">Create Entry</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/manage-entries" className="btn btn-primary w-100 fs-5 fs-lg-4 dashboard-button">Manage Entries</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/quotes" className="btn btn-primary w-100 fs-5 fs-lg-4 dashboard-button">Quotes</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/settings" className="btn btn-primary w-100 fs-5 fs-lg-4 dashboard-button">Settings</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/feedback" className="btn btn-primary w-100 fs-5 fs-lg-4 dashboard-button">Feedback</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;