import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Adjust the import path if necessary
import Register from './Register'; // Adjust the import path if necessary
import Login from './Login';
import ForgotPassword from './ForgotPassword'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add the new route */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;