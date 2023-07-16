import { Player } from '../domain/interfaces';
import UpdateOnePlayerService from '../services/UpdateOnePlayerService';
export default class UpdateOnePlayerHandler {
  private readonly updateOnePlayerService;
  constructor() {
    this.updateOnePlayerService = new UpdateOnePlayerService();
  }
  async execute(id: string, body: Partial<Player>) {
    return await this.updateOnePlayerService.updateOne(id, body);
  }
}
