import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import CreateLeagueService from '../services/CreateLeagueService';

export default class CreateLeagueAction {
  private createLeagueService;
  constructor() {
    this.createLeagueService = new CreateLeagueService();
  }
  async execute(data: Partial<LeagueEntity>) {
    return this.createLeagueService.execute(data);
  }
}
