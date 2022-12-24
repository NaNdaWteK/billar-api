import {
  Body,
  HttpCode,
  Controller,
  Post,
  Param,
  Get,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import CreateLeagueHandler from '../../../_league/controllers/CreateLeagueHandler';
import FindLeagueHandler from '../../../_league/controllers/FindLeagueHandler';
import LeagueEntity from '../../repositories/routing_controllers/entities/LeagueEntity';
import schemas, { League } from '../../schemas';
import configuration from '../../../config/infra';

@Controller('/api/v1')
@Service()
export default class LeagueController {
  private readonly createLeagueHandler;
  private readonly findLeagueHandler;
  private readonly logger;
  constructor() {
    this.createLeagueHandler = new CreateLeagueHandler();
    this.findLeagueHandler = new FindLeagueHandler();
    this.logger = configuration.infra.logger;
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
  async create(
    @Body({ required: true, validate: true })
      body: League
  ): Promise<LeagueEntity> {
    this.logger.info('Create League endpoint executed');
    return this.createLeagueHandler.execute(body);
  }

  @OpenAPI({
    summary: 'Find one league by id endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.League,
        },
      },
    },
    responses: {
      200: {
        description: 'Find result',
        content: {
          'application/json': {
            schema: schemas.League,
          },
        },
      },
    },
  })
  @HttpCode(200)
  @Get('/league/:id')
  async find(@Param('id') id: string): Promise<LeagueEntity> {
    this.logger.info('Find League endpoint executed', { id });
    return this.findLeagueHandler.execute(id);
  }
}
