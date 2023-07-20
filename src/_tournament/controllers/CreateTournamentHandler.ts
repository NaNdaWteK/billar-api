import { Tournament } from '../domain/interfaces';
import CreateTournamentService from '../services/CreateTournamentService';
export default class CreateTournamentHandler {
  private readonly createTournamentService;
  constructor() {
    this.createTournamentService = new CreateTournamentService();
  }
  async execute(data: Partial<Tournament>) {
    return await this.createTournamentService.execute(data);
  }
}
