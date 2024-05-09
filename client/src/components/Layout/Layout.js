import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar/sidebar';
import { LOGIN, ROOT} from '../../router/Approuter';
import { Flex, Box } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../Firebase/firebase'; // Ensure this path is correct to import your Firebase app instance
import { useCurrentUserDetails, useLogout } from '../../hooks/useAuth'; // Ensure this path is correct to import your custom hooks
import { useToast } from '@chakra-ui/react'; // Import useToast for notifications

export default function Layout() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const toast = useToast();
    const currentUser = useCurrentUserDetails();
    const logout = useLogout();

    useEffect(() => {
        // Ensure currentUser is defined and has a false isActive status
        if (currentUser.uid !=null && !currentUser.isActive) {
          logout();
          toast({
            title: "Account disabled.",
            description: "Your account is disabled. Contact the admin.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          navigate(ROOT);
        }
      }, [currentUser, logout, toast, navigate]);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (pathname.startsWith('/protected') && isAuthenticated === false) {
            console.log('Protected route access attempted without authentication');
            navigate(LOGIN);
        }
    }, [pathname, isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        // Optionally, you can render a loading spinner or a blank screen while checking auth state
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <Flex height="100vh">
            <Box as="aside" width={{ base: "100%", md: "250px" }} height="100vh" position="fixed">
                <Sidebar />
            </Box>
            <Box flex="1" marginLeft="150px" overflowY="auto">
                <Outlet />
            </Box>
        </Flex>
    );
}
