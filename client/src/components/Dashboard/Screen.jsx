import React from 'react';

const styles = {
  Screen: {
    width: '100vw', // 100% of the viewport width
    height: '100vh', // 100% of the viewport height
    backgroundColor: '#ece8d5',
    position: 'absolute', // Context for absolute positioning

  },
  Screen2:{
    minHeight: '100vh',
    overflow: 'auto', // Hide any overflow
    backgroundColor: '#ece8d5',
    position: 'absolute', // Context for absolute positioning
    width: '100%',

  }
};

const Screen = (props) => {
  return (
    <div style={styles.Screen2}>
      {props.children}
    </div>
  );
};

export default Screen;