import configuration from '../../config/infra';
import { playerRepo } from '../../__infrastructure/repositories/repositories/PlayerRepo';
import { Player } from '../domain/interfaces';
export default class FindPlayerService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = playerRepo;
  }
  async findAll(query: Partial<Player>) {
    const players = (await this.repo.findAll(query)) as Player[];
    this.logger.info('Finded players', { players });

    return players;
  }
}
