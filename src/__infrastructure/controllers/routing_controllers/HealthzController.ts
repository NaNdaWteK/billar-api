import { Controller, Get, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import HealthzHandler from '../../../_healthz/controllers/HealthzHandler';
import schemas from '../../schemas';

@Controller('/api/v1')
@Service()
export default class HealthzController {
  private healthzHandler;
  constructor() {
    this.healthzHandler = new HealthzHandler();
  }
  @OpenAPI({
    summary:
      'A simple "pong" like action that returns, used to ping the server.',
    responses: {
      200: {
        description: 'OK - The server is alive',
        content: {
          'application/json': {
            schema: schemas.Healthz,
          },
        },
      },
    },
  })
  @HttpCode(200)
  @Get('/healthz')
  async execute() {
    return this.healthzHandler.execute();
  }
}
