import React, { useState, useEffect } from 'react';
import './tts.css';
import Navbar from '../Navbar/navbar';
import { useNavigate } from "react-router-dom";

const TTS = (props) => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [voiceIndex, setVoiceIndex] = useState(0);
    const [rate, setRate] = useState(1);
    const [voices, setVoices] = useState([]);
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);

    // Initialize speech synthesis and recognition
    const speechSynthesis = window.speechSynthesis;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    // Function to populate available voices
    useEffect(() => {
        const getVoices = () => {
            setVoices(speechSynthesis.getVoices());
        };
        getVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = getVoices;
        }
    }, []);

    // Function to start listening
    const startListening = () => {
        if (recognition) {
            recognition.continuous = true;
            recognition.lang = 'en-US';
            recognition.start();
            recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                setTranscript(transcript);
            };
            setListening(true);
        }
    };

    // Function to stop listening
    const stopListening = () => {
        if (recognition && listening) {
            recognition.stop();
            setListening(false);
        }
    };

    // Function to handle click for TTS
    const handleClick = () => {
        const utterance = new SpeechSynthesisUtterance(inputText);
        utterance.voice = voices[voiceIndex];
        utterance.rate = rate;
        speechSynthesis.speak(utterance);
    };

    return (
        <div>
            <Navbar />
            <div>
                <button className="home-page-button" onClick={handleClick}>Speak</button>
                <select style={{ width: '100px' }} value={voiceIndex} onChange={(event) => setVoiceIndex(event.target.value)}>
                    {voices.map((voice, index) => (
                        <option key={voice.name} value={index}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
                <div>
                    <input type='range' min='0.1' max='2' value={rate} step='0.1' onChange={(event) => setRate(event.target.value)} />
                    <h3>Current speech rate: {rate}</h3>
                </div>
                <div>
                    <h2>Transcript:</h2>
                    <p>{transcript}</p>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={stopListening}>Stop Listening</button>
                </div>
            </div>
        </div>
    );
};

export default TTS;
