//imports 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//registration success component
const RegistrationSuccess = () => {

  return (
    <div className="container mt-5 registration-success" >
      <div className="text-center">
        <h2>Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <Link to="/login" className="btn button mt-3">Go to Login</Link>
      </div>
    </div>
  );
};

//export registration success component
export default RegistrationSuccess;