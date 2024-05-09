// src/App.js
import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { CombinedProvider } from './contexts/CombinedProvider';
import TTSControls from './components/TTS/TTSControls';

import { router } from './router/Approuter.js';
import './App.css'; // Make sure this is the path to your global stylesheet
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      var scrollTimeout = setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isScrolling) {
      document.body.classList.add('show-scrollbar');
    } else {
      document.body.classList.remove('show-scrollbar');
    }
  }, [isScrolling]);

  return (
    <CombinedProvider>
      <ChakraProvider>
      <RouterProvider router={router} />
      <TTSControls />
      </ChakraProvider>
    </CombinedProvider>  );
}
