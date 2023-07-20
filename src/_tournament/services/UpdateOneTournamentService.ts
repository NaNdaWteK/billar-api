import configuration from '../../config/infra';
import { tournamentRepo } from '../../__infrastructure/repositories/repositories/TournamentRepo';
import { Tournament } from '../domain/interfaces';
export default class UpdateOneTournamentService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = tournamentRepo;
  }
  async updateOne(id: string, body: Partial<Tournament>) {
    const tournament = (await this.repo.updateOne(id, body)) as Tournament;
    this.logger.info(`Updated tournament`, { tournament, body });

    return tournament;
  }
}
