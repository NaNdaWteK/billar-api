import configuration from '../../config/infra';
import LeagueRepo from '../../__infrastructure/repositories/routing_controllers/RCLeagueRepo';
import { League } from '../domain/interfaces';
export default class FindLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = new LeagueRepo();
  }
  async findAll(query: Partial<League>) {
    const leagues = (await this.repo.findAll(query)) as League[];
    this.logger.info('Finded leagues', { leagues });

    return leagues;
  }
}
