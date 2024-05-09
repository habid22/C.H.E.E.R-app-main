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
  text: 'An arrangement that offers socialization opportunities, leisure pursuits, and companionship for youth with intellectual handicaps.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;