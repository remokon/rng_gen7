import React from 'react';

export const Divider = ({ style }) => {
  return (
    <div className="divider">
      <hr style={{ ...style }} />
    </div>
  );
};
