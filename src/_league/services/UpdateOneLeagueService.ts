import configuration from '../../config/infra';
import { leagueRepo } from '../../__infrastructure/repositories/repositories/LeagueRepo';
import { League } from '../domain/interfaces';
export default class UpdateOneLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = leagueRepo;
  }
  async updateOne(id: string, body: Partial<League>) {
    const league = (await this.repo.updateOne(id, body)) as League;
    this.logger.info(`Updated league ${league.name}`, { league, body });

    return league;
  }
}
