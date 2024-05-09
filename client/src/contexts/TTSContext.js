// src/context/TTSContext.js
import React, { createContext, useState, useEffect } from 'react';

export const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
    const [isTTSEnabled, setIsTTSEnabled] = useState(JSON.parse(localStorage.getItem('isTTSEnabled')) || true);
    const [voiceIndex, setVoiceIndex] = useState(parseInt(localStorage.getItem('voiceIndex'), 10) || 0);
    const [rate, setRate] = useState(parseFloat(localStorage.getItem('rate')) || 1);

    useEffect(() => {
        localStorage.setItem('isTTSEnabled', JSON.stringify(isTTSEnabled));
        localStorage.setItem('voiceIndex', voiceIndex.toString());
        localStorage.setItem('rate', rate.toString());
    }, [isTTSEnabled, voiceIndex, rate]);

    return (
        <TTSContext.Provider value={{ isTTSEnabled, setIsTTSEnabled, voiceIndex, setVoiceIndex, rate, setRate }}>
            {children}
        </TTSContext.Provider>
    );
};
