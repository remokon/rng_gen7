import React from 'react';

export const Divider = ({ style }) => {
  const barStyle = {
    backgroundColor: 'rgba(0,0,0,0.1)',
    border: 'none',
    height: '1px',
    margin: '16px auto 7px',
    width: '268px',
  };

  return (
    <div>
      <hr style={{ ...barStyle, ...style }} />
    </div>
  );
};
