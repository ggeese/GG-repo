import React from 'react';

const TransportMethod = ({ switchState, setSwitchState }) => {
  const updateIndex = () => {
    setSwitchState((prevState) => (prevState === 'meme' ? 'LP' : 'meme'));
  };

  return (
    <div className="switch-container" onClick={updateIndex}>
      <div
        className={`switch-button ${switchState === 'LP' ? 'switch-right' : 'switch-left'}`}
      />
      <div className="switch-options">
        <span className="switch-option">Meme</span>
        <span className="switch-option">LP</span>
      </div>
    </div>
  );
};

export default TransportMethod;
