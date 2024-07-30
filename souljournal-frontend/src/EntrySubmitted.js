//imports 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EntrySubmitted.css';

//entry submitted component
const EntrySubmitted = () => {
  const navigate = useNavigate();

  return (
    <div className="container  mt-5 text-center">
      <h1 className="mb-4">Your entry has been saved!</h1>
      <button className="btn button fixed-size-button" onClick={() => navigate('/home')}>
        Home
      </button>
      <button className="btn button fixed-size-button" onClick={() => navigate('/journal')}>
        Journal
      </button>
    </div>
  );
};

//export entry submitted component
export default EntrySubmitted;