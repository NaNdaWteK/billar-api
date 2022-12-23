import request from 'supertest';
import { startServer } from '../test_support/server';

const CREATED = 201;
const BAD_REQUEST = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
describe('League', () => {
  beforeAll(async () => {
    app = await startServer();
  });

  afterAll(async () => {
    await app.stop();
  });
  it('can be created', async () => {
    const payload = {
      name: 'Liga 2022',
      type: 'Bola 8',
    };

    const response = await request(await app.server)
      .post('/api/v1/league')
      .send(payload);

    expect(response.statusCode).toBe(CREATED);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.type).toBe(payload.type);
  });
  it('need payload fields', async () => {
    const payload = {
      name: 'Liga 2022',
      // type: 'Bola 8',
    };
    const response = await request(await app.server)
      .post('/api/v1/league')
      .send(payload);

    expect(response.statusCode).toBe(BAD_REQUEST);
    expect(response.body.message).toBe(
      'Invalid body, check \'errors\' property for more info.'
    );
    expect(response.body.errors[0].property).toBe('type');
    expect(response.body.errors[0].target.name).toBe(payload.name);
    expect(response.body.errors[0].constraints.isString).toBe(
      'type must be a string'
    );
  });
});
