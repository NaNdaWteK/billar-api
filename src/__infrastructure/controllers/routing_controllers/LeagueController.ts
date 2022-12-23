import { Body, HttpCode, Controller, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import CreateLeagueHandler from '../../../_league/controllers/CreateLeagueHandler';
import LeagueEntity from '../../repositories/routing_controllers/entities/LeagueEntity';
import schemas, { League } from '../../schemas';

@Controller('/api/v1')
@Service()
export default class LeagueController {
  private createLeagueHandler;
  constructor() {
    this.createLeagueHandler = new CreateLeagueHandler();
  }
  @OpenAPI({
    summary: 'Create league endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.League,
        },
      },
    },
    responses: {
      201: {
        description: 'Creation result',
        content: {
          'application/json': {
            schema: schemas.League,
          },
        },
      },
      400: {
        description: 'Validation Errors',
        content: {
          'application/json': {
            schema: schemas.ValidationErrors,
          },
        },
      },
    },
  })
  @HttpCode(201)
  @Post('/league')
  async execute(
    @Body({ required: true, validate: true })
      body: League
  ): Promise<LeagueEntity> {
    return this.createLeagueHandler.execute(body);
  }
}
