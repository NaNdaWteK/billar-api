import { Tournament } from '../domain/interfaces';
import UpdateOneTournamentService from '../services/UpdateOneTournamentService';
export default class UpdateOneTournamentHandler {
  private readonly updateOneTournamentService;
  constructor() {
    this.updateOneTournamentService = new UpdateOneTournamentService();
  }
  async execute(id: string, body: Partial<Tournament>) {
    return await this.updateOneTournamentService.updateOne(id, body);
  }
}
