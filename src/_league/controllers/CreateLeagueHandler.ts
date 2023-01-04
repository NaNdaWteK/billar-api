import { League } from '../domain/interfaces';
import CreateLeagueService from '../services/CreateLeagueService';
export default class CreateLeagueHandler {
  private readonly createLeagueService;
  constructor() {
    this.createLeagueService = new CreateLeagueService();
  }
  async execute(data: Partial<League>) {
    return (await this.createLeagueService.execute(data)) as League;
  }
}
