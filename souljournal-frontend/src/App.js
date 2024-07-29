//imports 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Feedback from './Feedback';
import RegistrationSuccess from './RegistrationSuccess';
import Dashboard from './Dashboard';
import Quotes from './Quotes';
import FeedbackSubmitted from './FeedbackSubmitted';
import NewEntry from './NewEntry';
import EntrySubmitted from './EntrySubmitted'; // Import the new component
import Journal from './Journal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

//app component 
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/feedback-submitted" element={<FeedbackSubmitted />} />
            <Route path="/new-entry" element={<NewEntry />} /> 
            <Route path="/entry-submitted" element={<EntrySubmitted />} /> {/* Add the new route */}
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

//export app component
export default App;