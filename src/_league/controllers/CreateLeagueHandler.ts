import CreateLeagueService from '../services/CreateLeagueService';
import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
export default class CreateLeagueHandler {
  private readonly createLeagueService;
  constructor() {
    this.createLeagueService = new CreateLeagueService();
  }
  async execute(data: Partial<LeagueEntity>) {
    return (await this.createLeagueService.execute(data)) as LeagueEntity;
  }
}
