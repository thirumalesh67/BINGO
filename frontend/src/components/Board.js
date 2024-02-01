import React, { useState, useEffect } from 'react';
import './Board.css';
import { Button } from 'react-bootstrap';

const Board = ({ board, setBoard, ready, setReady }) => {
  const [toggleFill, setToggleFill] = useState(true);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    setReady(false);
    setBoard(Array(5).fill(Array(5).fill(null)));
    if (toggleFill) {
      setNumber(0);
    } else {
      setNumber(26);
    }
  }, [toggleFill]);

  useEffect(() => {
    if (isBoardNotEmpty(board)) {
      setReady(true);
    }
  }, [board]);

  const isBoardNotEmpty = (board) => {
    // Iterate through the board and check if any cell is non-null
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
        if (board[rowIndex][colIndex] == null) {
          return false; // Board is not empty
        }
      }
    }
    return true; // Board is empty
  };

  const toggleFillChange = (e) => {
    e.preventDefault();
    setToggleFill(!toggleFill);
  };

  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const readyGameHandler = (e) => {
    e.preventDefault();
  };

  // Function to fill the board with values in random places
  const fillRandom = () => {
    const values = Array.from({ length: 25 }, (_, i) => i + 1); // Create an array with values 1 to 25
    const shuffledValues = shuffleArray(values); // Shuffle the values randomly

    const filledBoard = board.map((row) =>
      row.map(() => {
        // Remove the first value from the shuffled array and return it for filling
        return shuffledValues.shift();
      }),
    );

    setBoard(filledBoard);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!board[rowIndex][colIndex]) {
      const updatedBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex
            ? toggleFill
              ? number + 1
              : number - 1
            : cell,
        ),
      );
      if (toggleFill) {
        setNumber(number + 1);
      } else {
        setNumber(number - 1);
      }
      setBoard(updatedBoard);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Game Board</h2>
      <div className='board'>
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='row2'
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className='cell2'
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)} // Call the handler with row and column indices
              >
                {cell}
                {/* {board[rowIndex][colIndex]} */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='buttons' style={{ textAlign: 'center' }}>
        <button
          className='btn btn-primary mr-3'
          style={{ marginRight: '5px' }}
          onClick={fillRandom}
        >
          Fill Random
        </button>
        <label>
          <input
            type='checkbox'
            checked={toggleFill}
            onChange={toggleFillChange}
          />
          Increasing
        </label>
      </div>
      {ready ? (
        <div style={{ textAlign: 'center', margin: '5px' }}>
          <button
            className='btn btn-info mr-3'
            style={{ marginRight: '5px', textAlign: 'center' }}
            onClick={readyGameHandler}
          >
            Ready
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Board;
