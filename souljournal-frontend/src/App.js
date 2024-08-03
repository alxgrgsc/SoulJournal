//imports 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Register from './Register';
import Login from './Login';
import Feedback from './Feedback';
import RegistrationSuccess from './RegistrationSuccess';
import Home from './Home';
import Quotes from './Quotes';
import FeedbackSubmitted from './FeedbackSubmitted';
import NewEntry from './NewEntry';
import EntrySubmitted from './EntrySubmitted'; // Import the new component
import Journal from './Journal';
import Settings from './Settings';
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
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/home" element={<Home />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/feedback-submitted" element={<FeedbackSubmitted />} />
            <Route path="/new-entry" element={<NewEntry />} /> 
            <Route path="/entry-submitted" element={<EntrySubmitted />} /> {/* Add the new route */}
            <Route path="/journal" element={<Journal />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

//export app component
export default App;