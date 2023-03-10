import {
  Body,
  HttpCode,
  Controller,
  Post,
  Param,
  Get,
  Put,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import CreateLeagueHandler from '../../../_league/controllers/CreateLeagueHandler';
import FindLeagueHandler from '../../../_league/controllers/FindLeagueHandler';
import UpdateOneLeagueHandler from '../../../_league/controllers/UpdateOneLeagueHandler';
import FindAllLeagueHandler from '../../../_league/controllers/FindAllLeagueHandler';
import schemas, {
  League as LeagueSchema,
  UpdateLeague as UpdateLeagueSchema,
} from '../../schemas';
import configuration from '../../../config/infra';
import { League } from '../../../_league/domain/interfaces';

@Controller('/api/v1')
@Service()
export default class LeagueController {
  private readonly createLeagueHandler;
  private readonly findLeagueHandler;
  private readonly findAllLeagueHandler;
  private readonly updateOneLeagueHandler;
  private readonly logger;
  constructor() {
    this.createLeagueHandler = new CreateLeagueHandler();
    this.findLeagueHandler = new FindLeagueHandler();
    this.updateOneLeagueHandler = new UpdateOneLeagueHandler();
    this.findAllLeagueHandler = new FindAllLeagueHandler();
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
      body: LeagueSchema
  ): Promise<League> {
    this.logger.info('Create League endpoint executed');
    return this.createLeagueHandler.execute(body);
  }

  @OpenAPI({
    summary: 'Update One league endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.UpdateLeague,
        },
      },
    },
    responses: {
      200: {
        description: 'Update result',
        content: {
          'application/json': {
            schema: schemas.UpdateLeague,
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
  @HttpCode(200)
  @Put('/league/:id')
  async updateOne(
    @Body({ required: true, validate: true })
      body: UpdateLeagueSchema,
    @Param('id') id: string
  ): Promise<League> {
    this.logger.info('Update One League endpoint executed', { id });
    return this.updateOneLeagueHandler.execute(id, body);
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
  async find(@Param('id') id: string): Promise<League> {
    this.logger.info('Find League endpoint executed', { id });
    return this.findLeagueHandler.execute(id);
  }

  @OpenAPI({
    summary: 'Finded all leagues by query.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.League,
        },
      },
    },
    responses: {
      200: {
        description: 'Finded all leagues by query',
        type: 'array',
        items: schemas.League,
      },
    },
  })
  @HttpCode(200)
  @Get('/league')
  async findAll(@Body() query: Partial<League>): Promise<League[]> {
    this.logger.info('Find All Leagues endpoint executed', { query });
    return this.findAllLeagueHandler.execute(query);
  }
}
