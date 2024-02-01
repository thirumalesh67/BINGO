import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { getToken } from '../utils/tokenUtil';
import { createGame } from '../utils/gameUtil';

const GamePage = () => {
  const [username, setUsername] = useState('');
  const [gameCode, setGameCode] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    // Check if a token exists when the component mounts
    const authToken = getToken();
    if (!authToken) {
      navigate('/');
    }
    const un = localStorage.getItem('username');
    setUsername(un);
  }, [username, navigate]);

  const handleJoinGame = (e) => {
    e.preventDefault();
    console.log('go to game');
    navigate(`/game/${gameCode}`);
  };

  const createGameHandler = async (e) => {
    e.preventDefault();
    try {
      const code = await createGame();
      setGameCode(code);
      navigate(`/game/${code}`);
    } catch (error) {}
  };

  return (
    <div>
      {username ? (
        <Container className='mt-5'>
          <Row className='justify-content-center'>
            <Col md={6} className='text-center'>
              <Image
                style={{ height: '300px', width: 'auto' }}
                src='/logo.png'
                alt='Logo'
                fluid
              />
            </Col>
          </Row>
          <Row className='justify-content-center text-center mt-3'>
            <h4>Hi, {username}</h4>
          </Row>
          <Row className='justify-content-center mt-3'>
            <Col md={6} className='text-center'>
              <Link to='/create-game'>
                <Button
                  variant='primary'
                  size='lg'
                  block
                  onClick={createGameHandler}
                >
                  Create Game
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className='justify-content-center mt-3'>
            <Col md={6} className='text-center'>
              <Form onSubmit={handleJoinGame}>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='Enter Game Code'
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                  />
                </Form.Group>
                <Button
                  className='mt-4'
                  variant='success'
                  size='lg'
                  block
                  type='submit'
                >
                  Join Game
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default GamePage;
