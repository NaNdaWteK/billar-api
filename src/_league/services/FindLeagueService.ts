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
  async find(id: string) {
    const league = (await this.repo.findById(id)) as League;
    this.logger.info(`Finded league ${league.name}`, { league });

    return league;
  }
}
