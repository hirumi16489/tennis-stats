import express, { Request, Response } from 'express';
import {
  PlayerNotFoundException,
  PlayerService,
} from '../service/player.service';
import { PlayerRepository } from '../repository/player.repository';
import { check, validationResult } from 'express-validator';

const router = express.Router();
const playerRepository = new PlayerRepository();
const playerService = new PlayerService(playerRepository);

router.get('/players', async (req: Request, res: Response) => {
  try {
    const players = await playerService.getPlayers();

    res.json(players);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  '/players/:id',
  check('id').isInt(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const player = await playerService.getPlayerById(parseInt(req.params.id));

      res.json(player);
    } catch (error: any) {
      if (error instanceof PlayerNotFoundException) {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: error.message });
    }
  },
);

export default router;
