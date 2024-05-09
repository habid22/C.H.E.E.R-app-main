
import React, { useState } from 'react';
import './register.css';
// Import icons
import idCardIcon from './assets/id-card.png';
import lockIcon from './assets/lock.png';
import keyIcon from './assets/key.png';
import userIcon from './assets/user.png';
import envelopeIcon from './assets/envelope.png';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../router/Approuter"

const Register = (props) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleLoginNavigation = () => {
    navigate(LOGIN);
  }

  return (
    <div className="register-container">

      <form className="register-form">
        <h1 className="register-heading">Sign Up</h1>
        <span className="register-instruction">Enter your details to continue</span>

        <div className="input-with-icon">
          <input
            type="text"
            required
            placeholder="Full Name"
            className="register-textinput"
          />
          <img alt="ID card icon" src={idCardIcon} className="register-icon" />
        </div>
        <div className="input-with-icon">
          <input
            type="text" // Changed from "username" to "text"
            required
            placeholder="Enter a username"
            className="register-textinput"
          />
          <img alt="User icon" src={userIcon} className="register-icon" />
        </div>
        <div className="input-with-icon">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="register-textinput"
          />
          <img alt="Lock icon" src={lockIcon} className="register-icon" />
        </div>
        <div className="input-with-icon">
          <input
            type="password"
            required
            placeholder="Enter a password"
            className="register-textinput"
          />
          <img alt="Key icon" src={keyIcon} className="register-icon" />
        </div>
        <div className="input-with-icon">
          <input
            type="password" // Changed for re-entering the password
            required
            placeholder="Re-enter your password"
            className="register-textinput"
          />
          <img alt="Envelope icon" src={envelopeIcon} className="register-icon" />
        </div>
        <div className="register-checkbox-container">
          <input
            type="checkbox"
            id="agreeTerms"
            className="register-checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)} // Toggle checkbox state
          />
          <label htmlFor="agreeTerms" className="register-text">
            I agree with the
            <a href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          </label>
        </div>

        {/* Disable button if checkbox is not checked */}
        <button type="submit" className="register-button" disabled={!isChecked}>
          Sign up
        </button>

        <div className="register-text register-login">
          Already have an account?
          {/* Wrap "Log In" text with a span and attach the onClick event handler */}
          <span onClick={handleLoginNavigation} className="login-link">
            Log In
          </span>
        </div>


      </form>
    </div>
  );
};

export default Register;
