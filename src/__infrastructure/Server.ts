import configuration from '../config/infra';
import { RoutingControllerServer } from './RoutingControllersServer';

export const httpServer = async () => {
  return await RoutingControllerServer.create(configuration.infra.logger);
};
