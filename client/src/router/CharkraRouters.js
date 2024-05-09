// src/pages/ProtectedGallery.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import ImageGallery from "../components/Gallary/Gallary";
import Layout from '../components/Layout/Layout';

const ChakraGallery = () => {
  return (
    <ChakraProvider>
        <ImageGallery />
        {/* <Layout /> */}
    </ChakraProvider>
  );
};

export default ChakraGallery;
