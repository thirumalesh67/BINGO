import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import GameRoom from './components/GameRoom';
import SocketContext from './components/SocketContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import io from 'socket.io-client';
const ENDPOINT = window.location.host;

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ['websocket'] });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/:code' element={<GameRoom />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
