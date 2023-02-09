import logger, { Logger } from 'pino';
import pino from 'pino';
import { Service } from 'typedi';
import LoggerInterface from './LoggerInterface';

@Service()
export default class PinoLogger implements LoggerInterface {
  private logger: Logger;
  private fileLogger: Logger;
  constructor() {
    this.fileLogger = logger({
      transport: {
        target: 'pino/file',
        options: { destination: process.cwd() + '/logs/logs.log' },
      },
    });
    this.logger = logger({
      transport: {
        target: 'pino-pretty',
      },
    });
  }

  info(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.info(message);
    const fileChild = this.fileLogger.child(data);
    fileChild.info(message);
  }

  error(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.error(message);
    const fileChild = this.fileLogger.child(data);
    fileChild.error(message);
  }

  warn(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.warn(message);
    const fileChild = this.fileLogger.child(data);
    fileChild.error(message);
  }
}
