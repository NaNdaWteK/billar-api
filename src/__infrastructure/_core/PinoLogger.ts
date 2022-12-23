import logger, { Logger } from 'pino';
import pino from 'pino';
import { Service } from 'typedi';
import LoggerInterface from './LoggerInterface';

@Service()
export default class PinoLogger implements LoggerInterface {
  private logger: Logger;
  constructor() {
    this.logger = logger({
      transport: {
        target: 'pino-pretty',
      },
    });
  }

  info(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.info(message);
  }

  error(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.error(message);
  }

  warn(message: string, data: pino.Bindings = {}) {
    const child = this.logger.child(data);
    if (process.env.NODE_ENV !== 'testing') child.warn(message);
  }
}
