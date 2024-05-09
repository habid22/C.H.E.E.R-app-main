import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import ShiftsByMonthComponent from './ShiftsByMonthComponent';
import EditClockingRecords from './EditClockingRecord';

const ReportPage = () => {
    return (
        <Box p={5}>
            <VStack spacing={8} align="stretch">
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    <Heading fontSize="xl" textAlign="center">Clocking Records</Heading>
                    <ShiftsByMonthComponent />
                </Box>
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                    <EditClockingRecords />
                </Box>
            </VStack>
        </Box>
    );
};

export default ReportPage;
