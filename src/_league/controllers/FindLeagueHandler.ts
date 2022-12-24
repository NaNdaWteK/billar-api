import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import FindLeagueService from '../services/FindLeagueService';
export default class FindLeagueHandler {
  private readonly findLeagueService;
  constructor() {
    this.findLeagueService = new FindLeagueService();
  }
  async execute(id: string) {
    return (await this.findLeagueService.find(id)) as LeagueEntity;
  }
}
