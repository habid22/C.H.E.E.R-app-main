import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./sidebar.css";
import { faUser, faEnvelope, faGlobe, faCalendarAlt, faCog, faQuestionCircle, faImages, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { ROOT, CALENDAR, DASHBOARD, SETTINGS, PROFILE, Gallary } from "../../../router/Approuter";
import { useAuth } from '../../../hooks/useAuth';
import { useLogout } from '../../../hooks/useAuth';
import { useCurrentUserDetails } from '../../../hooks/useAuth';

export default function Sidebar() {
    
    const navigate = useNavigate();
    const logout = useLogout();
    const userDetails = useCurrentUserDetails();

    //Lol image not hard coding all ur routes dw i fixed it >:)
    const handleNavigation = (path) => {
        navigate(path);
    }

    //useAuth logout

    const handleLogout = async() => {
        // Logout logic here
        console.log('Logging out...');
        await logout();
        if(userDetails.role === 'child'){
            // Trigger Google logout
            window.location.href = 'https://accounts.google.com/Logout';
        
            // Wait for a few seconds and then navigate to the homepage
            // Adjust the timeout duration as needed
          
        }
   
    };

    const commonButtonStyles = {
        background: "none",
        border: "none",
        boxShadow: "none",
        _hover: {
            transform: "scale(1.1)", // Slightly increase size on hover
            backgroundColor: "teal.100", // Light background on hover for normal buttons
        },
        transition: "transform 0.2s ease-in-out", // Smooth transition for the transform
    };
    //handleDashboardNavigation
    const handleDashboardNavigation = () => {
        navigate(DASHBOARD);
    }

    const handleProfileNavigation = () => {
        navigate(PROFILE);
    }
    const handleDirectMessageNavigation = () => {
        //navigate();
    }
    
    const handleCalenderNavigation = () => {
        navigate(CALENDAR);
    }
    const handleSettingNavigation = () => {
        navigate(SETTINGS);
    }
    
    const handleHelpNavigation = () => {
        //navigate();
    }
    const handleVideoCallNavigation = () => {
        //navigate();
    }

    const handleGalleryNavigation = () => { // Add this handler function
        navigate(Gallary);
    }


    return (
        <div className="sidebar-card">
            {/* Home */}
            <IconButton
                colorScheme='teal'
                aria-label='Home'
                icon={<FontAwesomeIcon className="fa-svg-icon home" icon={faHome} />}
                onClick={handleDashboardNavigation}
                sx={commonButtonStyles}

            />

            <div className="icons-container">

                {/* User Profile */}
                <IconButton
                    colorScheme='teal'
                    aria-label='Profile'
                    icon={<FontAwesomeIcon className="fa-svg-icon user" icon={faUser} />}
                    onClick={handleSettingNavigation}
                    sx={commonButtonStyles}

                />

                {/* Direct Messaging */}
                {/* <IconButton
                    colorScheme='teal'
                    aria-label='Direct Message'
                    icon={<FontAwesomeIcon className="fa-svg-icon message" icon={faEnvelope} />}
                    onClick={handleDirectMessageNavigation}
                    sx={commonButtonStyles}

                /> */}

                {/* Access Public Spaces */}
        

                {/* Calendar */}
                <IconButton
                    colorScheme='teal'
                    aria-label='Calendar'
                    icon={<FontAwesomeIcon className="fa-svg-icon calendar" icon={faCalendarAlt} />}
                    onClick={handleCalenderNavigation}
                    sx={commonButtonStyles}

                />

                 {/* Gallery */}
                 <IconButton
                    colorScheme='teal'
                    aria-label='Gallery' // Provide appropriate label
                    icon={<FontAwesomeIcon className="fa-svg-icon gallery" icon={faImages} />} // Use the faImages icon
                    onClick={handleGalleryNavigation} // Call the handler function
                    sx={commonButtonStyles}
                />

                <Box
                    width="40px"
                    height="2px"
                    backgroundColor="#d3d3d3"
                    borderRadius="2px"
                    alignSelf="center" // Centers the divider within the flex container
                />


                {/* Settings */}
                {/* <IconButton
                    colorScheme='teal'
                    aria-label='Settings'
                    icon={<FontAwesomeIcon className="fa-svg-icon settings" icon={faCog} />}
                    onClick={handleSettingNavigation}
                    sx={commonButtonStyles}

                /> */}

                {/* Help */}
                <IconButton
                    colorScheme='teal'
                    aria-label='Help'
                    icon={<FontAwesomeIcon className="fa-svg-icon help" icon={faQuestionCircle} />}
                    onClick={handleHelpNavigation}
                    sx={commonButtonStyles}

                />
            </div>

            {/* Video Call */}
            <IconButton
                colorScheme='teal'
                aria-label='Logout'
                icon={<FontAwesomeIcon className="fa-svg-icon logout" icon={faSignOutAlt} />}
                onClick={handleLogout}
                sx={{
                    ...commonButtonStyles,
                    _hover: {
                        backgroundColor: "red.500", // Red background on hover for logout
                        color: "white", // Ensure icon color contrasts well on hover
                    },
                }}
            />
        </div>
    );
}
