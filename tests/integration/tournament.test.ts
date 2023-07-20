import request from 'supertest';
import { startServer } from '../test_support/server';
import { LeagueType } from '../../src/_shared/domain/LeagueType';

const CREATED = 201;
const SUCCESS = 200;
const BAD_REQUEST = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
describe('Tournament', () => {
  let tournamentId = '';
  const payload = {
    type: LeagueType['Bola 8'],
  };
  beforeAll(async () => {
    app = await startServer();
  });

  afterAll(async () => {
    await app.stop();
  });
  it('can be created', async () => {
    const response = await request(await app.server)
      .post('/api/v1/tournament')
      .send(payload);
    tournamentId = response.body.id;
    expect(response.statusCode).toBe(CREATED);
    expect(response.body.type).toBe(payload.type);
  });
  it('can be find by id', async () => {
    const response = await request(await app.server).get(
      `/api/v1/tournament/${tournamentId}`
    );

    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.type).toBe(payload.type);
  });
  it('can be find all by query', async () => {
    const response = await request(await app.server)
      .get('/api/v1/tournament')
      .send({ type: payload.type });
    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body[0].type).toBe(payload.type);
  });
  it('can be edit by id', async () => {
    const updatedField = LeagueType['Bola 8 Francesa'];
    const response = await request(await app.server)
      .put(`/api/v1/tournament/${tournamentId}`)
      .send({ type: updatedField });
    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.type).toBe(updatedField);
  });
  it('need payload fields', async () => {
    const payload = {
    };
    const response = await request(await app.server)
      .post('/api/v1/tournament')
      .send(payload);
    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body.message).toBe(
      'Invalid body, check \'errors\' property for more info.'
    );
    expect(response.body.errors[0].property).toBe('type');
  });
});
