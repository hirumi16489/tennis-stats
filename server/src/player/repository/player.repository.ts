import axios from 'axios';
import { Player } from '../model/player.model';

const DATA_URL = process.env.DATA_URL;

export class PlayerRepository {
  async getPlayerList() {
    const response = await axios.get(DATA_URL);

    return response?.data?.players as Player[];
  }
}
