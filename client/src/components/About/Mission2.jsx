import React from 'react';

const styles = {
  Text: {
    color: '#607142',
    fontSize: '20px',
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: '26px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;