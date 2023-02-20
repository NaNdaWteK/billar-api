import configuration from '../../config/infra';
import { playerRepo } from '../../__infrastructure/repositories/repositories/PlayerRepo';
import { Player } from '../domain/interfaces';
export default class UpdateOnePlayerService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = playerRepo;
  }
  async updateOne(id: string, body: Partial<Player>) {
    const player = (await this.repo.updateOne(id, body)) as Player;
    this.logger.info(`Updated player ${player.name}`, { player, body });

    return player;
  }
}
