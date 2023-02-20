import { v4 as uuidv4 } from 'uuid';
import configuration from '../../config/infra';
import { playerRepo } from '../../__infrastructure/repositories/repositories/PlayerRepo';
import { Player } from '../domain/interfaces';
export default class CreatePlayerService {
  private logger;
  private repo;
  constructor() {
    this.logger = configuration.infra.logger;
    this.repo = playerRepo;
  }
  async execute(data: Partial<Player>) {
    data.id = uuidv4();
    const player = (await this.repo.add(data)) as unknown as Player;
    this.logger.info(`Created player ${player.name}`, { player });

    return player;
  }
}
