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
  async find(id: string) {
    const player = (await this.repo.findById(id)) as Player;
    this.logger.info(`Finded player ${player.name}`, { player });

    return player;
  }
}
