import React from 'react';
import { Link } from 'react-router-dom';
import SoulJournalLogo from './SoulJournalLogo'; // Adjust the import path if necessary
import './Home.css'; // Ensure you have this CSS file

function Home() {
  return (
    <div className="home">
      <div className="logo-container">
        <SoulJournalLogo />
      </div>
      <p className="tagline">Write, reflect, transform daily.</p>
      <div className="buttons">
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/feedback">
          <button className="button">Feedback</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;