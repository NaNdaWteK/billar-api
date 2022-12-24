import { FindOptionsWhere } from 'typeorm';
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
  async findAll(query: FindOptionsWhere<LeagueEntity>) {
    const leagues = (await this.repo.findAll(query)) as LeagueEntity[];
    this.logger.info('Finded leagues', { leagues });

    return leagues;
  }
}
