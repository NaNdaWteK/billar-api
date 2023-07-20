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
import CreateTournamentHandler from '../../../_tournament/controllers/CreateTournamentHandler';
import FindTournamentHandler from '../../../_tournament/controllers/FindTournamentHandler';
import UpdateOneTournamentHandler from '../../../_tournament/controllers/UpdateOneTournamentHandler';
import FindAllTournamentHandler from '../../../_tournament/controllers/FindAllTournamentHandler';
import schemas, {
  Tournament as TournamentSchema,
  UpdateTournament as UpdateTournamentSchema,
} from '../../schemas';
import configuration from '../../../config/infra';
import { Tournament } from '../../../_tournament/domain/interfaces';

@Controller('/api/v1')
@Service()
export default class TournamentController {
  private readonly createTournamentHandler;
  private readonly findTournamentHandler;
  private readonly findAllTournamentHandler;
  private readonly updateOneTournamentHandler;
  private readonly logger;
  constructor() {
    this.createTournamentHandler = new CreateTournamentHandler();
    this.findTournamentHandler = new FindTournamentHandler();
    this.updateOneTournamentHandler = new UpdateOneTournamentHandler();
    this.findAllTournamentHandler = new FindAllTournamentHandler();
    this.logger = configuration.infra.logger;
  }
  @OpenAPI({
    summary: 'Create tournament endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Tournament,
        },
      },
    },
    responses: {
      201: {
        description: 'Creation result',
        content: {
          'application/json': {
            schema: schemas.Tournament,
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
  @Post('/tournament')
  async create(
    @Body({ required: true, validate: true })
      body: TournamentSchema
  ): Promise<Tournament> {
    this.logger.info('Create Tournament endpoint executed');
    return this.createTournamentHandler.execute(body);
  }

  @OpenAPI({
    summary: 'Update One tournament endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.UpdateTournament,
        },
      },
    },
    responses: {
      200: {
        description: 'Update result',
        content: {
          'application/json': {
            schema: schemas.UpdateTournament,
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
  @Put('/tournament/:id')
  async updateOne(
    @Body({ required: true, validate: true })
      body: UpdateTournamentSchema,
    @Param('id') id: string
  ): Promise<Tournament> {
    this.logger.info('Update One Tournament endpoint executed', { id });
    return this.updateOneTournamentHandler.execute(id, body);
  }

  @OpenAPI({
    summary: 'Find one tournament by id endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Tournament,
        },
      },
    },
    responses: {
      200: {
        description: 'Find result',
        content: {
          'application/json': {
            schema: schemas.Tournament,
          },
        },
      },
    },
  })
  @HttpCode(200)
  @Get('/tournament/:id')
  async find(@Param('id') id: string): Promise<Tournament> {
    this.logger.info('Find Tournament endpoint executed', { id });
    return this.findTournamentHandler.execute(id);
  }

  @OpenAPI({
    summary: 'Finded all tournaments by query.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Tournament,
        },
      },
    },
    responses: {
      200: {
        description: 'Finded all tournaments by query',
        type: 'array',
        items: schemas.Tournament,
      },
    },
  })
  @HttpCode(200)
  @Get('/tournament')
  async findAll(@Body() query: Partial<Tournament>): Promise<Tournament[]> {
    this.logger.info('Find All Tournaments endpoint executed', { query });
    return this.findAllTournamentHandler.execute(query);
  }
}
