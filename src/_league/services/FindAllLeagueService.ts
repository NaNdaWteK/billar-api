import configuration from '../../config/infra';
import { leagueRepo } from '../../__infrastructure/repositories/repositories/LeagueRepo';
import { League } from '../domain/interfaces';
export default class FindLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = leagueRepo;
  }
  async findAll(query: Partial<League>) {
    const leagues = (await this.repo.findAll(query)) as League[];
    this.logger.info('Finded leagues', { leagues });

    return leagues;
  }
}
