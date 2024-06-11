import React from 'react';
import './Cell.css';

const Cell = ({ width, color, number }) => {
  const textColor = color === '#FFD700' ? '#1E290F' : '#FFF';
  const c = color === '#FFD700' ?  'brown' : 'black';


  return (
    <div className="cell" style={{ width: `${width}%`, backgroundColor: color, border: `2px solid ${c}` }}>
      <span className="cell-number" style={{ color: textColor }}>{number}</span>
    </div>
  );
}

export default Cell;

