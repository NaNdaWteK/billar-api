import { Tournament } from '../domain/interfaces';
import FindAllTournamentService from '../services/FindAllTournamentService';

export default class FindAllTournamentHandler {
  private readonly findAllTournamentService;
  constructor() {
    this.findAllTournamentService = new FindAllTournamentService();
  }
  async execute(query: Partial<Tournament>) {
    return await this.findAllTournamentService.findAll(query);
  }
}
