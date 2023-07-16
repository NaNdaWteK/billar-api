import { League } from '../domain/interfaces';
import FindLeagueService from '../services/FindLeagueService';
export default class FindLeagueHandler {
  private readonly findLeagueService;
  constructor() {
    this.findLeagueService = new FindLeagueService();
  }
  async execute(id: string) {
    return await this.findLeagueService.find(id);
  }
}
