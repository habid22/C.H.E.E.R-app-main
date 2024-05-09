import React from 'react';
import './homePage.css';
import Navbar from '../Navbar/navbar';
import { useNavigate } from "react-router-dom";
import { ABOUT, Gallary, LOGIN, REGISTER,NEWSLETTER,FORMBUILDER } from "../../router/Approuter";
import TTSControls from '../TTS/TTSControls';
import cheerConnections from '../assets/cheer_connections.png';


const HomePage = (props) => {
  const navigate = useNavigate()

  const handleAboutNavigation = () => {
    
    navigate(ABOUT);
  }
  const handleRegisterNavigation = () => {
    navigate(LOGIN);
  }

  const handleNewsletterNavigation = () => {
    navigate(NEWSLETTER);
  }


  return (
    <div>
      <Navbar />
      <div className="home-page-container">
        <div className="home-page-content">
          <h1 className="home-page-text">
            A Digital Platform for Young Adults with Intellectual Disabilities.
          </h1>
          <div className="home-page-buttons">
            <button type="button" className="home-page-button" onClick={handleRegisterNavigation}>
              Sign Up
            </button>
            <button type="button" className="home-page-button2" onClick={handleNewsletterNavigation}>
              Newsletter
            </button>
            <button type="button" className="home-page-button1" onClick={handleAboutNavigation}>
              About Us
            </button>
          </div>
        </div>
        <img
          src={cheerConnections}
          alt="Decorative graphic"
          className="home-page-image"
        />

      </div>
    </div>

  );
};

export default HomePage;
