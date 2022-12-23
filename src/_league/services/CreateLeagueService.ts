import { v4 as uuidv4 } from 'uuid';
import configuration from '../../config/infra';
import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import LeagueRepo from '../../__infrastructure/repositories/routing_controllers/LeagueRepo';
export default class CreateLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = new LeagueRepo();
  }
  async execute(data: Partial<LeagueEntity>) {
    data.id = uuidv4();
    const league = (await this.repo.add(data)) as LeagueEntity;
    this.logger.info(`Created league ${league.name}`, { league });

    return league;
  }
}
