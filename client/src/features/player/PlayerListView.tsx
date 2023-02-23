import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchPlayers } from './playerSlice';

import './PlayerListView.css';
import PlayerCard from '../../components/PlayerCard';

const PlayerView = () => {
  const player = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);
  return (
    <div>
      {player.loading && <div>Loading...</div>}
      {!player.loading && player.error ? (
        <div>Error: {player.error}</div>
      ) : null}
      {!player.loading && player.players.length ? (
        <div className="conatiner">
          <div className="wrap">
            {player.players.map((player) => (
              <div key={player.id} className="box">
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlayerView;
