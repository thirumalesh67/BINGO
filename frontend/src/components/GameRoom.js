import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/tokenUtil';
import GameBoard from './GameBoard';

const GameRoom = () => {
  const { code } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(code);

    const fetchGameDetails = async () => {
      try {
        const token = getToken();
        const response = await axios.get(`/api/game/${code}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setGameDetails(response.data);
        setLoading(false);
        if (response.data.status !== 'created') {
          setError('Game is not in the "created" state.'); // Set error message
        }
      } catch (error) {
        console.error('Error Fetching Game Details:', error);
        setLoading(false);
        setError('An error occurred while fetching game details.'); // Set error message
      }
    };
    fetchGameDetails();
  }, [code]);

  return (
    <div>
      {loading ? (
        <div className='loader'></div>
      ) : error ? (
        <p className='danger'>{error}</p>
      ) : (
        <GameBoard gameDetails={gameDetails} />
      )}
    </div>
  );
};

export default GameRoom;
