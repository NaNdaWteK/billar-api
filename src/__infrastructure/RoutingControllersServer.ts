import Router from 'koa-router';
import serve from 'koa-static';
import mount from 'koa-mount';
import * as rc from 'routing-controllers';
import * as to from 'typeorm';
import morgan from 'koa-morgan';
import { koaSwagger } from 'koa2-swagger-ui';
import config from '../config/default';
import Docs from './controllers/routing_controllers/Docs';
import HealthzController from './controllers/routing_controllers/HealthzController';
import LeagueController from './controllers/routing_controllers/LeagueController';
import LoggerInterface from './_core/LoggerInterface';
import { CorsHandler } from './middlewares/CorsHandler';
import { ErrorHandler } from './middlewares/ErrorHandler';
import LeagueEntity from './repositories/routing_controllers/entities/LeagueEntity';
import { Service } from 'typedi';

@Service()
export class RoutingControllerServer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public server: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private app: any;
  private logger: LoggerInterface;
  private router: Router;
  constructor(logger: LoggerInterface) {
    this.logger = logger;
    this.router = new Router();
    this.app = rc.createKoaServer({
      middlewares: [ErrorHandler, CorsHandler],
      controllers: [HealthzController, LeagueController, Docs],
      defaultErrorHandler: false,
      cors: true,
    });
  }
  static async create(logger: LoggerInterface) {
    const rcs = new RoutingControllerServer(logger);
    await rcs.configure();
    return rcs;
  }

  async stop() {
    return new Promise((r, j) => {
      this.server?.close();
      this.server.on('close', () => {
        r(true);
      });
      this.server.on('error', (error: Error) => {
        j(error);
      });
    });
  }

  start() {
    this.server = this.app.listen(config.port, () => {
      this.logger.info(`Listening on port ${config.port}...`);
    });
  }

  private async configure() {
    this.app.use(new CorsHandler().use);
    this.app.use(new ErrorHandler().use);
    this.router.get(
      '/docs',
      koaSwagger({
        title: 'API Docs',
        swaggerOptions: {
          url: '/api/v1/docs',
        },
      })
    );
    this.app.use(morgan('dev'));
    this.app.use(mount('/images/', serve(__dirname + '/../public/images/')));
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
    const dataSource = new to.DataSource({
      type: 'postgres',
      database: config.databaseName,
      synchronize: false,
      migrationsRun: false,
      host: config.databaseHost,
      port: parseInt(config.databasePort as string),
      username: config.databaseUser,
      password: config.databasePassword,
      entities: [LeagueEntity],
    });
    await dataSource
      .initialize()
      .then(async () => {
        return await this.databaseReady();
      })
      .catch((error) => {
        this.logger.error(`Start database fail: ${error.message}`, {
          stack: error.stack,
        });
        throw error;
      });
  }

  private async databaseReady() {
    this.logger.info('Database ready...');
  }
}
