import React from 'react';

export const TitleText = ({ children, style }) => {
  const textStyle = {
    color: 'rgba(0,0,0,0.87)',
    fontSize: '25px',
    margin: '40px auto 0px',
    textAlign: 'center',
  };
  return <div style={{ ...textStyle, ...style }}>{children}</div>;
};
