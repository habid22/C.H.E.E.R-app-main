import { useState, useEffect, useContext } from 'react';
import { TTSContext } from '../contexts/TTSContext';

// Use this for Settings page
{/* <TTSSettings /> */}
// Use this at the bottom of the jsx for FAB 
{/* <TTSControls /> */}

export const useTTS = () => {
    // Access the global speechSynthesis object
    const speechSynthesis = window.speechSynthesis;

    // State to manage whether speech is currently being spoken
    const [speaking, setSpeaking] = useState(false);

    // Retrieve context values
    const {
        isTTSEnabled,
        setIsTTSEnabled,
        voiceIndex,
        setVoiceIndex,
        rate,
        setRate
    } = useContext(TTSContext);

    // State to hold available voices
    const [voices, setVoices] = useState([]);

    // Function to populate voices
    useEffect(() => {
        const handleVoicesChanged = () => {
            setVoices(speechSynthesis.getVoices());
        };

        speechSynthesis.onvoiceschanged = handleVoicesChanged;
        handleVoicesChanged(); // For browsers that don't emit the voiceschanged event upon page load

        // Cleanup
        return () => {
            speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Function to toggle speech
    const toggleSpeakSelectedText = () => {
        if (speaking) {
            speechSynthesis.cancel();
            setSpeaking(false);
        } else {
            const text = window.getSelection().toString();
            if (text && isTTSEnabled) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = voices[voiceIndex] || null;
                utterance.rate = rate;
                utterance.onend = () => setSpeaking(false);
                utterance.onerror = () => setSpeaking(false);

                speechSynthesis.speak(utterance);
                setSpeaking(true);
            } else {
                alert('No text selected or TTS is disabled. Please select some text and try again.');
            }
        }
    };

    return { toggleSpeakSelectedText, speaking, voices, setVoiceIndex, voiceIndex, rate, setRate, isTTSEnabled, setIsTTSEnabled };
};


