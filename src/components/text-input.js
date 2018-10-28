import '../style/text-input.css';
import React from 'react';

export const TextInput = ({ placeholder, onChange, value }) => {
  const color = '#BBBBBB';
  const searchStyle = {
    borderRadius: '1px',
    margin: '20px auto',
    position: 'relative'
  };
  const inputStyle = {
    backgroundColor: '#454545',
    border: 'none',
    borderBottom: '2px solid #EEEEEE',
    color: '#EEEEEE',
    display: 'block',
    fontSize: '16px',
    height: '40px',
    margin: '0px 0px 1px 0px',
    outline: 'none',
    padding: '0px 0px 0px 5px'
    // width: "315px"
  };

  return (
    <div style={searchStyle}>
      <input style={inputStyle} type="text" value={value} onChange={event => onChange(event.target.value)} required />
      <span className="bar" style={{ '--bar-color': color }} />
      <label className="mat-label" style={{ '--label-color': color }}>
        {placeholder}
      </label>
    </div>
  );
};
