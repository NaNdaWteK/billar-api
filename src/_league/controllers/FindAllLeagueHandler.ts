import { League } from '../domain/interfaces';
import FindAllLeagueService from '../services/FindAllLeagueService';

export default class FindAllLeagueHandler {
  private readonly findAllLeagueService;
  constructor() {
    this.findAllLeagueService = new FindAllLeagueService();
  }
  async execute(query: Partial<League>) {
    return (await this.findAllLeagueService.findAll(query)) as League[];
  }
}
