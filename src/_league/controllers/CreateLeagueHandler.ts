import configuration from '../../config/infra';
import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import LeagueRepo from '../../__infrastructure/repositories/routing_controllers/LeagueRepo';
import { v4 as uuidv4 } from 'uuid';
export default class CreateLeagueHandler {
  private logger;
  constructor() {
    this.logger = configuration.infra.logger;
  }
  async execute(data: Partial<LeagueEntity>) {
    this.logger.info('Create League endpoint executed');
    data.id = uuidv4();
    return (await new LeagueRepo().add(data)) as LeagueEntity;
  }
}
