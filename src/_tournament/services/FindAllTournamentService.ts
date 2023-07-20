import configuration from '../../config/infra';
import { tournamentRepo } from '../../__infrastructure/repositories/repositories/TournamentRepo';
import { Tournament } from '../domain/interfaces';
export default class FindAllTournamentService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = tournamentRepo;
  }
  async findAll(query: Partial<Tournament>) {
    const tournaments = (await this.repo.findAll(query)) as Tournament[];
    this.logger.info('Finded tournaments', { tournaments });

    return tournaments;
  }
}
