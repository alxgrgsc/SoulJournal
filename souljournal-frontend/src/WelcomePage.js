//imports
import React, {useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WelcomePage.css';
import SoulJournalLogo from './SoulJournalLogo';



//welcomePage component
function WelcomePage() {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    if (location.state && location.state.fromLogout) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="home container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      {showAlert && (
        <div className="alert alert-success animation" role="alert">
          You have been logged out!
        </div>
      )}
      <div className="logo-container mb-4">
        <SoulJournalLogo />
      </div>
      <p className="tagline mb-4">Write, reflect, transform daily.</p>
      <div className="buttons d-flex justify-content-center w-100">
        <div className="d-flex flex-grow-1">
          <Link to="/register" className="w-100 me-3">
            <button className="btn button  w-100 fixed-size-button">Register</button>
          </Link>
        </div>
        <div className="d-flex flex-grow-1">
          <Link to="/login" className="w-100">
            <button className="btn button  w-100 fixed-size-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

//export welcome page component
export default WelcomePage;