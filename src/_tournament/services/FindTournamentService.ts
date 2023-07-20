import configuration from '../../config/infra';
import { tournamentRepo } from '../../__infrastructure/repositories/repositories/TournamentRepo';
import { Tournament } from '../domain/interfaces';
export default class FindTournamentService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = tournamentRepo;
  }
  async find(id: string) {
    const tournament = (await this.repo.findById(id)) as Tournament;
    this.logger.info(`Finded tournament`, { tournament });

    return tournament;
  }
}
