import React from 'react';
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
        <button className="button">Register</button>
        <button className="button">Login</button>
      </div>
    </div>
  );
}

export default Home;
