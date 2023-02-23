import React from 'react';
import Navbar from './components/Navbar';
import PlayerView from './features/player/PlayerListView';

function App() {
  return (
    <div>
      <Navbar />
      <PlayerView />
    </div>
  );
}

export default App;
