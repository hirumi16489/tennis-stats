import { Player } from '../model/player.model';
import { PlayerRepository } from '../repository/player.repository';

export class PlayerNotFoundException extends Error {}

export class PlayerService {
  constructor(private repository: PlayerRepository) {}

  async getPlayers() {
    const players = await this.repository.getPlayerList();

    if (players.length === 0) {
      return [];
    }

    players.sort((a: Player, b: Player) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    return players;
  }

  async getPlayerById(id: number) {
    const players = await this.repository.getPlayerList();

    const player = players.find((player: Player) => player.id === id);

    if (!player) {
      throw new PlayerNotFoundException();
    }

    return player;
  }
}
