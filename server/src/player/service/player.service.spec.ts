import { PlayerNotFoundException, PlayerService } from './player.service';
import { PlayerRepository } from '../repository/player.repository';
import fixtures from '../../utils/test/fixtures.json';
import sinon, { SinonStubbedInstance } from 'sinon';
import { Player } from '../model/player.model';

describe('Player service', () => {
  let repository: SinonStubbedInstance<PlayerRepository>;
  let service: PlayerService;

  beforeEach(() => {
    repository = sinon.createStubInstance(PlayerRepository);

    service = new PlayerService(repository);
  });

  it('should return a list of players sorted by id', async () => {
    repository.getPlayerList.returns(Promise.resolve(fixtures.players));

    const players = await service.getPlayers();

    expect(players).toEqual(
      [...fixtures.players].sort((a: Player, b: Player) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }),
    );
  });

  it('should return an empty array', async () => {
    repository.getPlayerList.returns(Promise.resolve([]));

    const players = await service.getPlayers();

    expect(players).toEqual([]);
  });

  it('should return a player for given id', async () => {
    repository.getPlayerList.returns(Promise.resolve(fixtures.players));

    const player = await service.getPlayerById(fixtures.players[0].id);

    expect(player).toEqual(fixtures.players[0]);
  });

  it('should throw error if id is not found', () => {
    repository.getPlayerList.returns(Promise.resolve([]));

    const promise = service.getPlayerById(fixtures.players[0].id);

    expect(promise).rejects.toThrowError(PlayerNotFoundException);
  });
});
