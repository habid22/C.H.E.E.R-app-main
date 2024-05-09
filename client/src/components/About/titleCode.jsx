import React from 'react';

const styles = {
  Text: {
    color: '#607142',
    fontSize: '48px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '62px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'About Us',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;