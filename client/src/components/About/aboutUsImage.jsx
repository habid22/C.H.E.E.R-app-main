import React from 'react';

// Styles for the flex container to center the IconComponent
const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh', // Fill the entire height of the screen
  width: '100vw',  // Fill the entire width of the screen
};

// Styles for the Icon itself
const iconStyles = {
  color: '#607142',
  fill: '#607142',
  width: '312px',  // Set the width of the icon
  height: '361px', // Set the height of the icon
};

// The IconComponent with the SVG content
const IconComponent = () => (
  <svg style={iconStyles} viewBox="0 0 24 24">
    {/* SVG Path */}
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M4 12a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM1.22 17.58A2.01 2.01 0 0 0 0 19.43V21h4.5v-1.61c0-.83.23-1.61.63-2.29-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58zM20 12a2 2 0 1 0 0 4 2 2 0 1 0 0-4zM22.78 17.58A6.95 6.95 0 0 0 20 17c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V21H24v-1.57c0-.81-.48-1.53-1.22-1.85zm-6.54-.93c-1.17-.52-2.61-.9-4.24-.9-1.63 0-3.07.39-4.24.9A2.988 2.988 0 0 0 6 19.39V21h12v-1.61c0-1.18-.68-2.26-1.76-2.74zM9 12c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z" />
    <path d="M2.48 10.86C2.17 10.1 2 9.36 2 8.6 2 6.02 4.02 4 6.6 4c2.68 0 3.82 1.74 5.4 3.59C13.57 5.76 14.7 4 17.4 4 19.98 4 22 6.02 22 8.6c0 .76-.17 1.5-.48 2.26.65.31 1.18.82 1.53 1.44.6-1.2.95-2.42.95-3.7C24 4.9 21.1 2 17.4 2c-2.09 0-4.09.97-5.4 2.51C10.69 2.97 8.69 2 6.6 2 2.9 2 0 4.9 0 8.6c0 1.28.35 2.5.96 3.7.35-.62.88-1.13 1.52-1.44z" />
  </svg>
);

// The Icon wrapper component that allows for an optional IconComponent prop
const Icon = (props) => {
  return (
    <div style={containerStyles}>
      {props.IconComponent ? <props.IconComponent /> : <IconComponent />}
    </div>
  );
};

export default Icon;
