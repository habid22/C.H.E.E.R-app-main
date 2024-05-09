import React from 'react';

const styles = {
  Screen: {
    backgroundColor: '#ece8d5',
  },
};

const Screen = (props) => {
  return (
    <div style={styles.Screen}>
      {props.children}
    </div>
  );
};

export default Screen;