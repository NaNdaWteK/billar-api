import { League } from '../domain/interfaces';
import CreateLeagueService from '../services/CreateLeagueService';

export default class CreateLeagueAction {
  private createLeagueService;
  constructor() {
    this.createLeagueService = new CreateLeagueService();
  }
  async execute(data: Partial<League>) {
    return this.createLeagueService.execute(data);
  }
}
