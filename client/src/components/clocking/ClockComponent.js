import React, { useState, useEffect } from 'react';
import { useCurrentUserDetails, useFetchUserDetails } from '../../hooks/useAuth'; // Adjust the import path based on your file structure
import { punchIn, punchOut } from '../../hooks/clockingHooks'; // Assuming these functions are available
import { Button } from '@chakra-ui/react';
const ClockInClockOutComponent = () => {
  const userDetails = useCurrentUserDetails();
  const [isPunchedIn, setIsPunchedIn] = useState(userDetails.isPunchedIn);
  const [shiftDuration, setShiftDuration] = useState(null);
  const [workDuration, setWorkDuration] = useState(null);

  useEffect(() => {
    setIsPunchedIn(userDetails.isPunchedIn);
  }, [userDetails.isPunchedIn]);

  useEffect(() => {
    let interval;
    if (isPunchedIn && userDetails.punchInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const punchInTime = new Date(userDetails.punchInTime).getTime();
        const duration = now - punchInTime;
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        setShiftDuration(`${hours}h ${minutes}m`);
      }, 1000);
    } else if (!isPunchedIn && shiftDuration) {
      setWorkDuration(shiftDuration);
      setShiftDuration(null);
    }
    return () => clearInterval(interval);
  }, [isPunchedIn, userDetails.punchInTime, shiftDuration]);

  const handlePunch = async () => {
    if (isPunchedIn) {
      await punchOut(userDetails.uid);
      setIsPunchedIn(false);
    } else {
      await punchIn(userDetails.uid, userDetails.name);
      setIsPunchedIn(true);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'transparent', borderRadius: '5px', maxWidth: '300px' }}>
      <h3 style={{ color: isPunchedIn ? 'green' : 'red' }}>Status: {isPunchedIn ? 'Punched In' : 'Punched Out'}</h3>
      {isPunchedIn && shiftDuration && <p>Current Shift Duration: {shiftDuration}</p>}
      {!isPunchedIn && workDuration && <p>You worked {workDuration} this shift.</p>}
      <Button
      width='120px'
        colorScheme={isPunchedIn ? 'red' : 'whatsapp'}
        onClick={handlePunch}
      >
        {isPunchedIn ? 'Punch Out' : 'Punch In'}
      </Button>
    </div>
  );
};

export default ClockInClockOutComponent;
