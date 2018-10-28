import React from 'react';
import check from '../img/check.svg';

export const Checkbox = ({ onCheckHandler, color, label, checked, style }) => {
  const onClick = () => onCheckHandler(!checked);
  const checkStyle = {
    backgroundColor: checked ? color : 'transparent',
    border: '1px solid',
    borderColor: color,
    borderRadius: '2px',
    display: 'inline-block',
    height: '20px',
    margin: '0px 20px 0px 0px',
    width: '20px',
    transition: '.2s'
  };
  const labelStyle = {
    display: 'inline-block',
    position: 'absolute',
    top: '2px'
  };
  const containerStyle = {
    margin: '10px',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      <div style={checkStyle} onClick={onClick}>
        {checked ? (
          <img src={check} style={{ width: '20px', height: '21px' }} />
        ) : (
          <div style={{ width: '20px', height: '20px' }} />
        )}
      </div>
      <label style={{ ...labelStyle, ...style }} onClick={onClick}>
        {label}
      </label>
    </div>
  );
};
