//imports 
import React, { useEffect, useState } from 'react';
import { Link, useLocation, } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

//home component 
const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  //show notification message depending on the state of the location
  useEffect(() => {
    //when user logs in
    if (location.state && location.state.from === 'login') {
      setNotificationMessage('You have successfully logged in!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); 
    //when user submits feedback
    } else if (location.state && location.state.from === 'feedback') {
      setNotificationMessage('Your feedback has been submitted. Thank you!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); 
    //when user saves new entry
    } else if (location.state && location.state.from === 'new-entry') {
      setNotificationMessage('Your entry has been saved!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); 
    }
  }, [location.state]);


  useEffect(() => {
    //get user email from local storage 
    const email = localStorage.getItem('userEmail');

    //fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3300/user/details?email=${email}`);
        const data = await response.json();
        console.log('User data:', data); // Log the response data

        setFirstName(data.firstName);
        setLastName(data.lastName);

        //save firstname and lastname to local storage 
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('lastName', data.lastName);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    //check if email is present
    if (email) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
  }, [firstName, lastName]);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 slide-down">
      <div className="row w-100 justify-content-center text-center">
      {showNotification && (
        <Alert variant="success" className="animation">
          {notificationMessage}
        </Alert>
        )}
        <h1 className="mb-4">Welcome back, {firstName}!</h1>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/new-entry" className="btn w-100 fs-5 fs-lg-4 dashboard-button">Create Entry</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/journal" className="btn w-100 fs-5 fs-lg-4 dashboard-button">Journal</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/quotes" className="btn w-100 fs-5 fs-lg-4 dashboard-button">Quotes</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/settings" className="btn w-100 fs-5 fs-lg-4 dashboard-button">Settings</Link>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <Link to="/feedback" className="btn w-100 fs-5 fs-lg-4 dashboard-button">Feedback</Link>
        </div>
      </div>
    </div>
  );
};

//export home component
export default Home;