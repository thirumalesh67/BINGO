import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import Board from './Board';
import GamePlay from './GamePlay';

const GameBoard = ({ gameDetails }) => {
  const [ready, setReady] = useState(false);
  const [board, setBoard] = useState(Array(5).fill(Array(5).fill(null))); // Initialize an empty 5x5 board

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={3} style={{ lineHeight: '50px', alignItems: 'center' }}>
          <Image
            style={{ height: '50px', width: 'auto', alignContent: 'center' }}
            src='/logo.png'
            alt='Logo'
            fluid
          />
        </Col>
        <Col xs={9} className='full-width-text'>
          <h4
            style={{
              lineHeight: '50px',
              width: 'auto',
              fontSize: '60px',
              letterSpacing: '10px',
            }}
          >
            {gameDetails.code}
          </h4>
        </Col>
      </Row>
      {ready ? (
        <GamePlay board={board} gameDetails={gameDetails} />
      ) : (
        <Board
          board={board}
          setBoard={setBoard}
          ready={ready}
          setReady={setReady}
        />
      )}
    </Container>
  );
};

export default GameBoard;
