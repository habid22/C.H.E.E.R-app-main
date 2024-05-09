import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ABOUT, DASHBOARD, LOGIN , REGISTER} from "../../router/Approuter";
import cheerConnections from '../assets/NAVICON.png';


import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate()

    const handleHomeNavigation = () => {
        navigate("/");
    }
    const handleLoginNavigation = () => {
        navigate(LOGIN);
        //navigate(DASHBOARD)
    }
    const handleRegisterNavigation = () => {
        navigate(REGISTER);
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar-container">
            <header className="navbar-navbar-interactive">
                <img
                    alt="logo"
                    src={cheerConnections}
                    className="navbar-image"
                    onClick={handleHomeNavigation}
                />
                <div className="navbar-desktop-menu">
                    <div className="navbar-buttons">
                        <button className="navbar-login" onClick={handleLoginNavigation}>Login</button>


                    </div>
                </div>
                <div className="navbar-burger-menu" onClick={toggleMobileMenu}>
                    <span className="burger-icon">&#9776;</span> {/* Burger Icon */}
                </div>
                <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="navbar-nav">
                        <div className="navbar-top">
                            <img
                                alt="logo"
                                src={cheerConnections}
                                className="navbar-logo"
                            />
                            <div className="navbar-close-menu" onClick={toggleMobileMenu}>
                                <span className="close-icon">&#10006;</span> {/* Close Icon */}
                            </div>
                        </div>
                        <div className="navbar-buttons1">
                            <button className="navbar-login1" onClick={handleLoginNavigation}>Login</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
