import React from 'react';
import './wave.css';

function Wave(props) {
  const { progress = 0 } = props;
  return (
    <div className="WavePro" data-num="67">
      <span>{progress.toFixed(2)}</span>%<div className="glare"></div>
      <div className="turn" style={{top: `${100 - progress}%`}}></div>
    </div>
  );
}

export default Wave;
