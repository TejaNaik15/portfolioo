import React from 'react';

const Shuffle = ({ text, className = '', style = {} }) => {
  return (
    <div className={`animate-pulse ${className}`} style={style}>
      {text}
    </div>
  );
};

export default Shuffle;