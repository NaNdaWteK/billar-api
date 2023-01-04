import { httpServer } from './__infrastructure/Server';

export default class App {
  static async main() {
    process.on('uncaughtException', (error) => {
      console.error(error);
    });

    process.on('unhandledRejection', (reason) => {
      console.error(reason);
    });

    const server = await httpServer();
    await server.start();
    return server;
  }
}
