import { v4 as uuidv4 } from 'uuid';
import configuration from '../../config/infra';
import { tournamentRepo } from '../../__infrastructure/repositories/repositories/TournamentRepo';
import { Tournament } from '../domain/interfaces';
export default class CreateTournamentService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = tournamentRepo;
  }
  async execute(data: Partial<Tournament>) {
    data.id = uuidv4();
    const tournament = (await this.repo.add(data)) as unknown as Tournament;
    this.logger.info(`Created tournament`, { tournament });

    return tournament;
  }
}
