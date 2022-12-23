import request from 'supertest';
import { startServer } from '../test_support/server';

const SUCCESS = 200;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
describe('API', () => {
  beforeAll(async () => {
    app = await startServer();
  });

  afterAll(async () => {
    await app.stop();
  });
  it('Server is available', async () => {
    const response = await request(await app.server).get('/api/v1/healthz');

    expect(response.statusCode).toBe(SUCCESS);
    expect(response.body.status).toBe('ok');
  });
});
