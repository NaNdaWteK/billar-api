import FindTournamentService from '../services/FindTournamentService';
export default class FindTournamentHandler {
  private readonly findTournamentService;
  constructor() {
    this.findTournamentService = new FindTournamentService();
  }
  async execute(id: string) {
    return await this.findTournamentService.find(id);
  }
}
