import React from 'react';

const TransportMethod = ({ switchPool, setSwitchPool }) => {
  const updateIndex = () => {
    setSwitchPool((prevState) => (prevState === 'UNI' ? 'GG' : 'UNI'));
  };

  return (
    <div className="switch-container2" onClick={updateIndex}>
      <div
        className={`switch-button2 ${switchPool === 'GG' ? 'switch-right' : 'switch-left'}`}
      />
      <div className="switch-options">
        <span className="switch-option2">UNI</span>
        <span className="switch-option2">GG</span>
      </div>
    </div>
  );
};

export default TransportMethod;
