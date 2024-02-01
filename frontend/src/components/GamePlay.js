import React, { useEffect, useState, useContext } from 'react';
import { getUsername } from '../utils/tokenUtil';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

import SocketContext from './SocketContext';

const GamePlay = ({ board, gameDetails }) => {
  const socket = useContext(SocketContext);
  const [gameReadyBtn, setGameReadyBtn] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [players, setPlayers] = useState([]);
  const [yourTurn, setYourTurn] = useState(false);
  const [gameState, setGameState] = useState(
    Array(5).fill(Array(5).fill({ visited: false })),
  );
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const username = getUsername();
    socket.on('joinRoom', (players) => {
      setPlayers(players);
      if (players.length > 1) {
        setGameReadyBtn(false);
      }
    });
    socket.emit('joinRoom', gameDetails.code, username, board); // Replace gameCode with your game's code
    socket.on('startGame', () => {
      setGameStart(true);
      setGameReadyBtn(true);
    });

    socket.on('selectNumber', (selectedNumber) => {
      setGameState((prevGameState) => {
        const updatedGameState = prevGameState.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            if (board[rowIndex][colIndex] === selectedNumber) {
              // Update the visited property for the matching cell
              return { ...cell, visited: true };
            }
            return cell;
          });
        });
        return updatedGameState;
      });
    });

    socket.on('gameOver', (winner) => {
      setGameOver(true);
      setWinner(winner);
    });

    socket.on('yourTurn', () => {
      setYourTurn(true);
    });
    return () => {
      socket.emit('leaveRoom', gameDetails.code, username);
      socket.disconnect();
    };
  }, [gameDetails.code, board, socket]);

  const startGameHandler = (e) => {
    e.preventDefault();
    setGameReadyBtn(true);
    socket.emit('startGame', gameDetails.code);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const selectedNumber = board[rowIndex][colIndex];
    socket.emit('selectNumber', gameDetails.code, selectedNumber);
    setYourTurn(false);
  };

  return (
    <Container>
      <div className='d-flex flex-row justify-content-between mb-3'>
        <h2>Players:</h2>
        <Button
          className='btn btn-info'
          disabled={gameReadyBtn}
          onClick={startGameHandler}
        >
          Start Game
        </Button>
      </div>
      {gameStart ? (
        <Row>
          {gameOver ? (
            <h1 style={{ textAlign: 'center', color: 'green' }}>
              Game Over {winner}
            </h1>
          ) : (
            <h2 style={{ textAlign: 'center' }}>
              {yourTurn ? 'Your Turn' : 'Game Board'}
            </h2>
          )}

          <div className='board mb-4'>
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
                      pointerEvents:
                        !gameState[rowIndex][colIndex].visited && yourTurn
                          ? ''
                          : 'none',
                      backgroundColor: gameState[rowIndex][colIndex].visited
                        ? 'yellow'
                        : 'white',
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
        </Row>
      ) : (
        <></>
      )}
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Player Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default GamePlay;
