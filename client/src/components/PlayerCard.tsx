import React from 'react';
import './PlayerCard.css';
import { Player } from '../features/player/playerSlice';

type PlayerCardProps = {
  player: Player;
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <div className="card">
      <div
        className="banner"
        style={{ backgroundImage: `url(${player.country.picture})` }}
      >
        <img src={player.picture} alt="Avatar" />
      </div>
      <div>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <h2 className="name">
        {player.firstname} {player.lastname}
      </h2>
      <div className="title">{player.shortname}</div>
      <div className="info-wrapper">
        <div className="info">
          <h2>
            <div>
              <span>{player.data.rank}</span>
              <small>Rank</small>
            </div>
          </h2>
          <h2>
            <div>
              <span>{player.data.points}</span>
              <small>Points</small>
            </div>
          </h2>
        </div>
        <div className="info">
          <h2>
            <div>
              <span>{player.data.weight / 1000}</span>
              <small>Weight</small>
            </div>
          </h2>
          <h2>
            <div>
              <span>{player.data.height / 100}</span>
              <small>Height</small>
            </div>
          </h2>
        </div>
        <div className="info single">
          <h2>
            <div>
              <span>{player.data.age}</span>
              <small>Age</small>
            </div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
