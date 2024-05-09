import React, { useState, useEffect } from "react";
import { FORMBUILDER, REPORTS} from "../../router/Approuter";
import { useNavigate } from "react-router-dom";
import TTSSettings from '../TTS/TTSSettings';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Heading,
  Button,
  Avatar,
  extendTheme,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  useToast,

} from "@chakra-ui/react";
import {
  FiCamera,
  FiUsers,
  FiMusic,
  FiShield,
  FiSettings,
  FiPhoneCall,
  FiFileText,
  FiArchive,
} from "react-icons/fi";

import { ADMIN } from "../../router/Approuter";
import { useCurrentUserDetails } from "../../hooks/useAuth"; // Importing the useCurrentUserDetails hook

// Extend the theme to include custom colors for text and background
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#ECE8D5",
        color: "black",
      },
    },
  },
});

function Settings() {
  const navigate = useNavigate();
  const userDetails = useCurrentUserDetails(); // Get current user's details

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactAdminModalOpen, setIsContactAdminModalOpen] = useState(false);
  const [isGuardiansModalOpen, setIsGuardiansModalOpen] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState("Default");
  const toast = useToast();
  const fileInputRef = React.useRef(null);
  const [isSpeechRateModalOpen, setIsSpeechRateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const toggleSpeechRateModal = () => {
    setIsSpeechRateModalOpen(!isSpeechRateModalOpen);
  };

  const handleAdminPortalNavigation = () => {
    navigate(ADMIN);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleGuardiansModal = () => {
    setIsGuardiansModalOpen(!isGuardiansModalOpen);
  };

  const toggleContactAdminModal = () => {
    setIsContactAdminModalOpen(!isContactAdminModalOpen);
  };

  const handleContactAdmin = () => {
    toggleContactAdminModal();
    toast({
      title: "Admin Notified",
      description: "An administrator has been alerted. Please wait for a response.",
      status: "info",
      duration: 8000,
      isClosable: true,
    });
  };

  const handleChangeAvatar = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        console.log("Selected file:", file);
      } else {
        console.error("Please select an image file.");
      }
    }
  };
  const handleFormbuilderNavigation = () => {
    navigate(FORMBUILDER);
  }

  const handleReportNavigation = () => {
    navigate(REPORTS);
  }

  // useEffect to handle loading state
  useEffect(() => {
    if (userDetails.uid !== null) {
      setIsLoading(false);
    }
  }, [userDetails]);


  const getNameOfProfile = userDetails.displayName ? userDetails.displayName : userDetails.email;

    // useEffect to handle loading state
    useEffect(() => {
      if (userDetails.uid !== null) {
        setIsLoading(false);
      }
    }, [userDetails]);
  
  
  return (
    <ChakraProvider theme={theme}>
      <Flex align="center" justify="center" h="100vh">
        <Box
          bg="#ECE8D5"
          p={6}
          rounded="md"
          w={800}
          h={850}
          shadow="0px 0px 20px rgba(0, 0, 0, 0.2)"
        >
          <VStack spacing={9} align="center">
            <Flex align="center">
              <Icon as={FiSettings} color="#607142" mr={2} boxSize="30px" />
              <Heading size="lg" color="#607142">
                Account Settings
              </Heading>
            </Flex>
            
            <Avatar src={userDetails.avatar} alt="Profile" size="xl" />

            
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            {/* <Button
              size="sm"
              bg="#607142"
              color="white"
              _hover={{ bg: "#485a36" }}
              leftIcon={<FiCamera />}
              onClick={handleChangeAvatar}
            >
              Change Avatar
            </Button> */}

            {/* <Button
              w={350}
              bg="#607142"
              color="white"
              _hover={{ bg: "#485a36" }}
              leftIcon={<FiUsers />}
              onClick={toggleGuardiansModal}
            >
              Guardians
            </Button> */}

            <Modal isOpen={isGuardiansModalOpen} onClose={toggleGuardiansModal} size="xl">
              <ModalOverlay />
              <ModalContent bg="white">
                <ModalHeader>Your Guardians</ModalHeader>
                <ModalBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Guardian Name</Th>
                        <Th>Relationship</Th>
                        <Th>Contact</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>John Doe</Td>
                        <Td>Parent</Td>
                        <Td>123-456-7890</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={toggleGuardiansModal}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isSpeechRateModalOpen} onClose={toggleSpeechRateModal} size="md">
              <ModalOverlay />
              <ModalContent bg="white">
                <ModalHeader>Speech Rate</ModalHeader>
                <ModalBody>

                  <TTSSettings />

                  <VStack spacing={4}>
                    {/* Slider for adjusting speech rate */}
                    <Box>
                      {/* <Slider value={speechRate} min={0.5} max={2} step={0.1} onChange={setSpeechRate}>
                        <SliderTrack>
                          <SliderFilledTrack bg="#3182ce" />
                        </SliderTrack>
                        <SliderThumb boxSize={6} bg="#3182ce" />
                      </Slider> */}
                    </Box>
          
                    {/* <Select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                      <option value="Default">Default</option>
                    </Select> */}
                  </VStack>

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={toggleSpeechRateModal}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              w={350}
              bg="#607142"
              color="white"
              _hover={{ bg: "#485a36" }}
              leftIcon={<FiMusic />}
              onClick={toggleSpeechRateModal}
            >
              Speech Rate
            </Button>
            {userDetails.role && userDetails.role === 'admin' && (
              <Button
                w={350}
                bg="#607142"
                color="white"
                _hover={{ bg: "#485a36" }}
                leftIcon={<FiFileText />}
                onClick={handleFormbuilderNavigation}
              >Form Builder</Button>
            )}

            {userDetails.role && userDetails.role === 'admin' && (
              <Button
                w={350}
                bg="#607142"
                color="white"
                _hover={{ bg: "#485a36" }}
                leftIcon={<FiArchive />}
                onClick={handleReportNavigation}
              >Reports</Button>
            )}

            {/* Render Admin Portal button only if the user has the role "admin" */}
            {userDetails.role && userDetails.role === 'admin' && (
              <Button
                w={350}
                bg="#A92626"
                color="white"
                _hover={{ bg: "maroon" }}
                leftIcon={<FiShield />}
                onClick={handleAdminPortalNavigation}
              >
                Admin Portal
              </Button>

            )}

            <Modal isOpen={isContactAdminModalOpen} onClose={toggleContactAdminModal} size="xl">
              <ModalOverlay />
              <ModalContent bg="white">
                <ModalHeader>Contact Admin</ModalHeader>
                <ModalBody>
                  <p>
                    If you wish to get in contact with an administrator please email: ongoinglivinglearning@gmail.com.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={toggleContactAdminModal}>
                    Cancel
                  </Button>
                  {/* <Button colorScheme="red" mr={3} onClick={handleContactAdmin}>
                    Contact Admin
                  </Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              w={350}
              bg="#A92626"
              color="white"
              _hover={{ bg: "maroon" }}
              leftIcon={<FiPhoneCall />}
              onClick={toggleContactAdminModal}
            >
              Contact Admin
            </Button>
          </VStack>
        </Box>
      </Flex>

    </ChakraProvider>
  );
}

export default Settings;
