import * as Application from 'koa';
import httpStatus from 'http-status';
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';
import configuration from '../../config/infra';
import { Service } from 'typedi';
import ErrorAdapter from '../_core/ErrorAdapter';

@Service()
@Middleware({ type: 'before' })
export class ErrorHandler implements KoaMiddlewareInterface {
  public async use(context: Application.Context, next: Application.Next) {
    try {
      await next();
    } catch (error) {
      const err = new ErrorAdapter(error);
      configuration.infra.logger.error(err.message, err.toLog());
      const status = err.code || httpStatus.INTERNAL_SERVER_ERROR;
      context.status = status;
      context.body = err.toResponse();
      return;
    }
  }
}
