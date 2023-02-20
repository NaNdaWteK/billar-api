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
import CreatePlayerHandler from '../../../_player/controllers/CreatePlayerHandler';
import FindPlayerHandler from '../../../_player/controllers/FindPlayerHandler';
import UpdateOnePlayerHandler from '../../../_player/controllers/UpdateOnePlayerHandler';
import FindAllPlayerHandler from '../../../_player/controllers/FindAllPlayerHandler';
import schemas, {
  Player as PlayerSchema,
  UpdatePlayer as UpdatePlayerSchema,
} from '../../schemas';
import configuration from '../../../config/infra';
import { Player } from '../../../_player/domain/interfaces';

@Controller('/api/v1')
@Service()
export default class PlayerController {
  private readonly createPlayerHandler;
  private readonly findPlayerHandler;
  private readonly findAllPlayerHandler;
  private readonly updateOnePlayerHandler;
  private readonly logger;
  constructor() {
    this.createPlayerHandler = new CreatePlayerHandler();
    this.findPlayerHandler = new FindPlayerHandler();
    this.updateOnePlayerHandler = new UpdateOnePlayerHandler();
    this.findAllPlayerHandler = new FindAllPlayerHandler();
    this.logger = configuration.infra.logger;
  }
  @OpenAPI({
    summary: 'Create player endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Player,
        },
      },
    },
    responses: {
      201: {
        description: 'Creation result',
        content: {
          'application/json': {
            schema: schemas.Player,
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
  @Post('/player')
  async create(
    @Body({ required: true, validate: true })
      body: PlayerSchema
  ): Promise<Player> {
    this.logger.info('Create Player endpoint executed');
    return this.createPlayerHandler.execute(body);
  }

  @OpenAPI({
    summary: 'Update One player endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.UpdatePlayer,
        },
      },
    },
    responses: {
      200: {
        description: 'Update result',
        content: {
          'application/json': {
            schema: schemas.UpdatePlayer,
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
  @Put('/player/:id')
  async updateOne(
    @Body({ required: true, validate: true })
      body: UpdatePlayerSchema,
    @Param('id') id: string
  ): Promise<Player> {
    this.logger.info('Update One Player endpoint executed', { id });
    return this.updateOnePlayerHandler.execute(id, body);
  }

  @OpenAPI({
    summary: 'Find one player by id endpoint.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Player,
        },
      },
    },
    responses: {
      200: {
        description: 'Find result',
        content: {
          'application/json': {
            schema: schemas.Player,
          },
        },
      },
    },
  })
  @HttpCode(200)
  @Get('/player/:id')
  async find(@Param('id') id: string): Promise<Player> {
    this.logger.info('Find Player endpoint executed', { id });
    return this.findPlayerHandler.execute(id);
  }

  @OpenAPI({
    summary: 'Finded all players by query.',
    requestBody: {
      content: {
        'application/json': {
          schema: schemas.Player,
        },
      },
    },
    responses: {
      200: {
        description: 'Finded all players by query',
        type: 'array',
        items: schemas.Player,
      },
    },
  })
  @HttpCode(200)
  @Get('/player')
  async findAll(@Body() query: Partial<Player>): Promise<Player[]> {
    this.logger.info('Find All Players endpoint executed', { query });
    return this.findAllPlayerHandler.execute(query);
  }
}
