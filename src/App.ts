import configuration from './config/infra';
import { RoutingControllerServer } from './__infrastructure/RoutingControllersServer';

export default class App {
  static async main() {
    process.on('uncaughtException', (error) => {
      console.error(error);
    });

    process.on('unhandledRejection', (reason) => {
      console.error(reason);
    });

    const rcs = await RoutingControllerServer.create(
      configuration.infra.logger
    );
    await rcs.start();
    return rcs;
  }
}
