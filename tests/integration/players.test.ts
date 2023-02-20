import request from 'supertest';
import { startServer } from '../test_support/server';

const CREATED = 201;
const SUCCESS = 200;
const BAD_REQUEST = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
describe('Player', () => {
  let playerId = '';
  const payload = {
    name: 'Nacho',
    email: 'nacho@test.com',
  };
  beforeAll(async () => {
    app = await startServer();
  });

  afterAll(async () => {
    await app.stop();
  });
  it('can be created', async () => {
    const response = await request(await app.server)
      .post('/api/v1/player')
      .send(payload);
    playerId = response.body.id;
    expect(response.statusCode).toBe(CREATED);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.email).toBe(payload.email);
  });
  it('can be find by id', async () => {
    const response = await request(await app.server).get(
      `/api/v1/player/${playerId}`
    );

    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.email).toBe(payload.email);
  });
  it('can be find all by query', async () => {
    const response = await request(await app.server)
      .get('/api/v1/player/')
      .send({ name: payload.name });
    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body[0].name).toBe(payload.name);
    expect(response.body[0].email).toBe(payload.email);
  });
  it('can be edit by id', async () => {
    const updatedField = 'New name';
    const response = await request(await app.server)
      .put(`/api/v1/player/${playerId}`)
      .send({ name: updatedField });

    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.name).toBe(updatedField);
  });
  it('need payload fields', async () => {
    const payload = {
      // name: 'Nacho',
      email: 'nacho@test.com',
    };
    const response = await request(await app.server)
      .post('/api/v1/player')
      .send(payload);
    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body.message).toBe(
      'Invalid body, check \'errors\' property for more info.'
    );
    expect(response.body.errors[0].property).toBe('name');
    expect(response.body.errors[0].target.email).toBe(payload.email);
    expect(response.body.errors[0].constraints.isString).toBe(
      'name must be a string'
    );
  });
});
