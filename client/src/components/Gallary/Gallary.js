import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  ModalFooter,
  Spinner,
  Heading,
  VStack,
  Center,
} from '@chakra-ui/react';

const ImageGalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const API_BASE_URL = 'https://my-api-service-qokrqcvrpa-uc.a.run.app';

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/albums/listAlbums`)
      .then(res => res.json())
      .then(async (albumsData) => {
        const albumsPromises = albumsData.map(async (album) => {
          const response = await fetch(`${API_BASE_URL}/api/albums/getAlbumImages/${album.id}`);
          const images = await response.json();
          return { ...album, images };
        });

        const albumsComplete = await Promise.all(albumsPromises);
        setAlbums(albumsComplete);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching album data:', error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <VStack spacing={10} p={5}>
      <Heading as="h1" size="2xl" textAlign="center" my={10}>
        Image Gallery
      </Heading>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        albums.map((album, index) => (
          <Box key={index} w="full">
            <Heading as="h2" size="lg" mb={4}>
              {album.title}
            </Heading>
            <Grid templateColumns="repeat(auto-fill, 150px)" gap={3} justifyContent="center">
              {album.images.map((image, idx) => (
                <Center key={idx} boxSize="150px" boxShadow="md" borderRadius="md" onClick={() => handleImageClick(image)} p="1">
                  <Image src={image} alt={`Image ${idx}`} objectFit="contain" boxSize="100%" />
                </Center>
              ))}
            </Grid>
          </Box>
        ))
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              {selectedImage && <Image src={selectedImage} alt="Selected" maxW="full" maxH="80vh" objectFit="contain" />}
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ImageGalleryPage;
