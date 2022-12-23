import { Service } from 'typedi';
import configuration from '../../config/infra';
@Service()
export default class Logger {
  static init() {
    return configuration.infra.logger;
  }
}
