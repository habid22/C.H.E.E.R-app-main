import React from 'react';

const styles = {
  Text: {
    color: '#e6ab9b',
    fontSize: '120px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '156px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'O   P    P    U    R    T    U   N     I      T    Y',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;