import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { getToken } from '../utils/tokenUtil';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists when the component mounts
    const authToken = getToken();
    if (authToken) {
      navigate('/game');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username });
      const tokenData = {
        token: response.data.token,
        username: response.data.user.username,
        expiresAt: new Date().getTime() + 3590 * 1000,
      };
      const tokenDataString = JSON.stringify(tokenData);
      localStorage.setItem('token', tokenDataString);
      navigate('/game');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col md={6} className='text-center'>
          <Image
            style={{ height: '300px', width: 'auto' }}
            src='/logo.png'
            alt='Logo'
            fluid
          />
          <Form onSubmit={handleSubmit} className='mt-4'>
            <Form.Group controlId='username'>
              <Form.Label>Enter Your Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-3'>
              Start Game
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
