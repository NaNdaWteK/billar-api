process.env.NODE_ENV = 'testing';
process.env.RESTAPI_PORT = '5000';
import 'reflect-metadata';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as rc from 'routing-controllers';
import * as td from 'typedi';
import * as dotenv from 'dotenv';
import App from '../../src/App';
import schemas from '../../src/__infrastructure/schemas';

dotenv.config();
rc.useContainer(td.Container);

const storage = rc.getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {},
  {
    definitions: schemas,
  }
);

import Swagger from '../../src/Swagger';
Swagger.spec = spec;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any;

export async function startServer() {
  server = await App.main();
  return server;
}
