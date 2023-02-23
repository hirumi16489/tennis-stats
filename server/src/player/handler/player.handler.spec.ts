import request from 'supertest';
import app from '../../app';
import nock from 'nock';
import fixtures from '../../utils/test/fixtures.json';
import { Player } from '../model/player.model';

describe('Player handler', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a list of players', () => {
    const sortedFixtures = [...fixtures.players];

    sortedFixtures.sort((a: Player, b: Player) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    nock(process.env.DATA_URL).get('').reply(200, fixtures);
    return request(app)
      .get('/players')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(sortedFixtures);
      });
  });

  it('should return a list of players', () => {
    nock(process.env.DATA_URL).get('').reply(500, {});
    return request(app)
      .get('/players')
      .expect(500)
      .expect(({ body }) => {
        expect(body).toEqual({ error: 'Request failed with status code 500' });
      });
  });

  it('should return player for given id', () => {
    nock(process.env.DATA_URL).get('').reply(200, fixtures);
    return request(app)
      .get(`/players/${fixtures.players[0].id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject(
          fixtures.players.find(
            (player: Player) => player.id === fixtures.players[0].id,
          ),
        );
      });
  });

  it('should return not found if player doesnt exist', () => {
    nock(process.env.DATA_URL).get('').reply(200, fixtures);
    return request(app).get(`/players/999`).expect(404);
  });

  it('should return bad request if id is not an int', () => {
    nock(process.env.DATA_URL).get('').reply(200, fixtures);
    return request(app).get(`/players/ssssss`).expect(400);
  });
});
