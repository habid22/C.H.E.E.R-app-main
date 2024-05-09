import React from 'react';
import settingsBackground from './Profile.png'; // Make sure this path is correct

export default function Settings() {
  const backgroundStyle = {
    width: '80vw', // 100% of the viewport width
    height: '95vh', // 100% of the viewport height
    backgroundImage: `url(${settingsBackground})`,
    backgroundPosition: 'center center', // Center the image
    backgroundSize: '100% 100%', // Fit to the container without stretching
    backgroundRepeat: 'no-repeat' // Do not repeat the image
  };

  return (
    <div style={backgroundStyle}>
      {/* Other content can go here if needed */}
    </div>
  );
}
