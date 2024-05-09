import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'; // Import the consolidated CSS
import CreatePost from '../CreatePost/Createpost'; // Ensure this is the correct import
import { Button } from '@chakra-ui/react';
import { useCurrentUserDetails } from '../../../hooks/useAuth';

export default function Header() {
    const navigate = useNavigate();
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const currentUser = useCurrentUserDetails();

    const handleCreatePostOpen = () => {
        setIsCreatePostOpen(true); // Directly set the   to open
    };

    const handleClose = () => {
        setIsCreatePostOpen(false); // Function to close the  
    };

    // Ensure other handlers are correctly implemented
    const handleViewMessageButton = () => { /* navigate(); */ };
    const handleProfileNavigation = () => { console.log("Profile"); /* navigate(); */ };

    return (
        <div className="header-container">
            {currentUser.avatar && (
                <img src={currentUser.avatar} alt="Profile" className="header-profile" onClick={handleProfileNavigation} />
            )}
            <div className="small-text">Hello {currentUser.name || 'User'}!</div>
            <div className="big-text">Welcome to Your Dashboard</div>
            {currentUser.role === 'admin' && (
                <div className="options-card">
                    <Button  width='120px' colorScheme='whatsapp' onClick={handleCreatePostOpen}>Create a Post</Button>
                </div>
            )}
            {isCreatePostOpen && <CreatePost onClose={handleClose} />}
        </div>
    );
}
