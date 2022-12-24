import configuration from '../../config/infra';
import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import LeagueRepo from '../../__infrastructure/repositories/routing_controllers/LeagueRepo';
export default class FindLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = new LeagueRepo();
  }
  async find(id: string) {
    const league = (await this.repo.findById(id)) as LeagueEntity;
    this.logger.info(`Finded league ${league.name}`, { league });

    return league;
  }
}
