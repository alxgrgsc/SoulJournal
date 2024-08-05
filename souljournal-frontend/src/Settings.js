//imports 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Settings.css';

//settings component
const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('email');
      navigate('/', { state: { fromLogout: true } });
    }
  };
  //load dark mode setting from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.body.classList.toggle('dark-mode', savedTheme);
  }, []);

  //handle theme change
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  //use navigate 
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Settings</h2>
      <Form>
        <Form.Check 
          type="switch"
          id="dark-mode-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={handleThemeChange}
        />
      </Form>
      <Button onClick={handleLogout} className="btn button fixed-size-button">Logout</Button>
      <Button onClick={() => navigate('/home')} className="btn button fixed-size-button">Home</Button>
    </div>
  );
};

//export settings component
export default Settings;