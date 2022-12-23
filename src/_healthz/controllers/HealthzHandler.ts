import configuration from '../../config/infra';

export default class HealthzController {
  private logger;
  constructor() {
    this.logger = configuration.infra.logger;
  }
  async execute() {
    this.logger.info('Healthz endpoint executed');
    return { status: 'ok' };
  }
}
