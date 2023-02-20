import { Player } from '../domain/interfaces';
import CreatePlayerService from '../services/CreatePlayerService';
export default class CreatePlayerHandler {
  private readonly createPlayerService;
  constructor() {
    this.createPlayerService = new CreatePlayerService();
  }
  async execute(data: Partial<Player>) {
    return (await this.createPlayerService.execute(data)) as Player;
  }
}
