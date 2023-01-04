import { v4 as uuidv4 } from 'uuid';
import configuration from '../../config/infra';
import { leagueRepo } from '../../__infrastructure/repositories/repositories/LeagueRepo';
import { League } from '../domain/interfaces';
export default class CreateLeagueService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = leagueRepo;
  }
  async execute(data: Partial<League>) {
    data.id = uuidv4();
    const league = (await this.repo.add(data)) as unknown as League;
    this.logger.info(`Created league ${league.name}`, { league });

    return league;
  }
}
