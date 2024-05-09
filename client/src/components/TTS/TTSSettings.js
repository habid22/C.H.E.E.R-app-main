// components/TTS/TTSSettings.js
import React from 'react';
import { useTTS } from '../../hooks/useTTS';

const TTSSettings = () => {
    const { voiceIndex, setVoiceIndex, rate, setRate, voices, isTTSEnabled, setIsTTSEnabled } = useTTS();


    const handleToggleChange = (e) => {
        console.log(e.target.checked);
        setIsTTSEnabled(e.target.checked);
        console.log("previous state was",isTTSEnabled);  // This will always log the previous state
    };

    return (
        <div>
            <select style={{ width: '200px' }} value={voiceIndex || ''} onChange={(e) => setVoiceIndex(e.target.value)}>
                {voices.map((voice, index) => (
                    <option key={voice.voiceURI} value={index}>
                        {voice.name} - {voice.lang}
                    </option>
                ))}
            </select>
            <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                defaultValue="1"
                onChange={(e) => setRate(e.target.value)}
            />
            <h3>Current speech rate is: {rate}</h3>
            <label>
                Enable TTS:
                <input
                    type="checkbox"
                    checked={isTTSEnabled}
                    onChange={handleToggleChange}
                />
            </label>
        </div>
    );
};

export default TTSSettings;
