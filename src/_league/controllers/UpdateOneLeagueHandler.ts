import { League } from '../domain/interfaces';
import UpdateOneLeagueService from '../services/UpdateOneLeagueService';
export default class UpdateOneLeagueHandler {
  private readonly updateOneLeagueService;
  constructor() {
    this.updateOneLeagueService = new UpdateOneLeagueService();
  }
  async execute(id: string, body: Partial<League>) {
    return await this.updateOneLeagueService.updateOne(id, body);
  }
}
