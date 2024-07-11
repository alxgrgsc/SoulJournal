import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Feedback from './Feedback';
import RegistrationSuccess from './RegistrationSuccess';
import Dashboard from './Dashboard';
import Quotes from './Quotes'; // Import the Quotes component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotes" element={<Quotes />} /> {/* Add the new route */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;