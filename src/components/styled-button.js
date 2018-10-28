import './style/styled-button.css';
import React from 'react';

export const StyledButton = ({ children, onClick, color, style }) => {
  return (
    <div style={style}>
      <button className="search-button" onClick={onClick} style={{ backgroundColor: color }}>
        {children}
      </button>
    </div>
  );
};
