import React, { useState, useEffect  } from 'react';
import useSound from 'use-sound'
import endSound from './assets/combo.mp3' // Your sound file path here
import moveSound from './assets/step.mp3' // Your sound file path here
import Brick from './Brick';
import Award from './Award';
import {initBlocks, topBlock, putBlock, saveScore, initCells, addMove, clearMove, makeUndo} from './Utils';
import './Play.css';

const Play = ({ user, puzzle, best, handlePage }) => {
  // Define the array of blocks with position (row and column), color, and number
  
  const colors = ['#FFD700', '#FFD700', '#1E90FF',]
  const widths = [66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 98, 100, 100, 100, 100]
  const [playEndSound] = useSound(endSound)
  const [playMoveSound] = useSound(moveSound)
 
  
  const [cells, setCells] = useState([]);
  const [moves, setMoves] = useState([]);
  const [score, setScore] = useState(0)
  
  const [touch, setTouch] = useState( { flag: false, index: 0, row: 0 })
  const [gameFinished, setGameFinished] = useState(false);
  
  useEffect(() => {
    setCells(initBlocks(puzzle))
  }, [puzzle]);



  const undoClick = () => {
    const a = initBlocks(puzzle) 
    setCells(makeUndo(initCells(a), moves))
    setMoves(clearMove(moves))
    setScore(score-1)
  }

  const randClick = () => {
    console.log(`Rand clicked`);
  }


  const toggleAward = () => {
    setGameFinished(false);
    console.log("score saved---->>>>>>>>>>>>", score, moves.length)
    saveScore(user, score, puzzle, moves)

    setTimeout( () => {handlePage(0,user, 0,0)}, 1000 );
  
    
  };



  const handleColumnClick = (column) => {
//    console.log(`Column ${column} clicked`);

    if (touch.flag===false) {
      let i = topBlock(cells,column) 
      if (i>=0) {
        let r = upCell(i)
        setTouch({ flag: true, index: i, row: r })
      }
    } else {
      let row = putBlock(cells, column, touch.index)
      if (row>0) {
        const clm = cells[touch.index].column
        setMoves(addMove(moves, clm, column))
        setScore(score + 1)
        downCell(column, row)
      } else {
        moveBack()
      }
      setTouch({flag: false, index: 0, row: 0})
    }
  };



function moveBack() {
  const updatedCells = [...cells];
  updatedCells[touch.index].row = touch.row;
  setCells(updatedCells);
}
 
function upCell(i) {
  const updatedCells = cells.map(block => ({...block, m: false}));
  let r = updatedCells[i].row 
  updatedCells[i].row = 2;
  setCells(updatedCells);
  return r
}



const checkEnd = () => {
  setGameFinished(true)
}

 
function makeMerge(up, index) {
  const upCells = [...up];
  const m = upCells[index]
 
  const ind = upCells.findIndex(b => b.row === m.row+1 && b.column === m.column 
    && b.color === m.color && b.number === m.number);
  
  if(ind>=0) {
    const { row: rw, column: col, color: clr, number: num } = upCells[ind];
    if (index>ind) {
      upCells.splice(index, 1)
      upCells.splice(ind, 1)
    } else {
      upCells.splice(ind, 1)
      upCells.splice(index, 1)
    }
    playMoveSound()
    upCells.push({row: rw, column: col, color: clr, number: num + 1, m: true })
    setCells(upCells);
    const i = upCells.length - 1
    const t = (Math.floor(Math.random() * 10))*20 + 100;
    setTimeout( () => {makeMerge(upCells, i)}, t );
  } else {
    if (upCells.length<3) {
      playEndSound()
//      setTimeout( () => {checkEnd()}, 1000 );
      checkEnd(score);
    }
  }
}
 

function downCell(column, row) {
  //  console.log("moveKnight = ", row, col)
    const updatedCells = [...cells];
    // Implement L-shaped move validation

    updatedCells[touch.index].row = row;
    updatedCells[touch.index].column = column;
    setCells(updatedCells);
    setTimeout( () => {makeMerge(updatedCells, touch.index)}, 100 );
}
 


  // Create an empty grid and populate it with blocks based on their position
  const gridSize = 6 * 15; // 6 columns and 15 rows
  const gridCells = Array.from({ length: gridSize }, (_, index) => {
    const row = Math.floor(index / 6) + 1;
    const column = (index % 6) + 1;
    const block = cells.find(b => b.row === row && b.column === column);
    
    if (block) {
      return (
        <Brick 
          key={index} 
          width={widths[block.number]} // Full width for filled blocks
          color={colors[block.color]} 
          isEmpty={false} 
          number={block.number} 
          merge={block.m} 
          column={column}
          onClick={handleColumnClick}
         />
      );
    } else {
      return (
        <Brick 
          key={index} 
          width={100} 
          color="#333333" // Color to blend with grid background
          isEmpty={true} 
         column={column}
          onClick={handleColumnClick}
         />
      );
    }
  });
 
  return (
    <div className="play-container">
      <div className="top-div">
        {score>0 && !gameFinished && <button onClick={randClick} className="rand-button">Rand</button>}
        <div className="play-score">Moves: {score}</div>
        {score>0 && !gameFinished && <button onClick={undoClick} className="undo-button">Undo</button>}
      </div>
      <div className="grid-container">
        {gridCells}
      </div>
      <div className="bottom-div">
        <div className="play-best">#{puzzle}. Best score: {best}</div>
      </div>

      {gameFinished && <Award score={score} best={best} onClose={toggleAward} />}

    </div>
  );
}

export default Play;


