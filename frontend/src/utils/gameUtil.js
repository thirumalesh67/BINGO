import axios from 'axios';
import { getToken } from './tokenUtil';

const createGame = async () => {
  try {
    const token = getToken();
    const response = await axios.post(
      '/api/game/create',
      {},
      {
        headers: {
          'x-auth-token': token,
        },
      },
    );
    return response.data.code;
  } catch (error) {
    console.error('Error creating a game: ', error);
    throw error;
  }
};

export { createGame };
