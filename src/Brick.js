import React from 'react';
import Cell from './Cell';
import './Brick.css';
import Stars from './Stars';

const Brick = ({ width, color, isEmpty, number, merge, column,  onClick }) => {
  return (
    <div 
      className={`brick ${isEmpty ? 'empty' : ''}`} 
      onClick={() => onClick(column)}
      data-column={column}
    >
      {!isEmpty ? (
        <Cell width={width} color={color} number={number} />
      ) : null}

      {merge && <Stars />}
 
    </div>
  );
}

export default Brick;
