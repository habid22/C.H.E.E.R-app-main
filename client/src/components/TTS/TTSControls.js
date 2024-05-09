// components/TTS/TTSControls.js
import React from 'react';
import { useTTS } from '../../hooks/useTTS';
import { Button, Box } from '@chakra-ui/react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const TTSControls = () => {
    const { toggleSpeakSelectedText, speaking, isTTSEnabled } = useTTS();

    const buttonColor = '#607142'; // Your specified button color
    const hoverColor = '#007bff'; // A bit lighter for the hover state
    const iconColor = 'black'; // White color for the icon

    return (
        <div>
            {isTTSEnabled && (
                <Box position="fixed" bottom="25" right="25">
                    <Button
                        backgroundColor={buttonColor}
                        color={iconColor}
                        borderRadius="50%"
                        padding="0"
                        minWidth="50px"
                        height="50px"
                        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Adjust the shadow to your preference
                        _hover={{
                            backgroundColor: hoverColor,
                            transform: 'scale(1.1)', // Slightly increase the button size on hover
                        }}
                        onClick={toggleSpeakSelectedText}
                    >
                        {speaking ? <FaVolumeMute size="24px" /> : <FaVolumeUp size="24px" />}
                    </Button>
                </Box>
            )}
        </div>
    );
};

export default TTSControls;
