import FindPlayerService from '../services/FindPlayerService';
export default class FindPlayerHandler {
  private readonly findPlayerService;
  constructor() {
    this.findPlayerService = new FindPlayerService();
  }
  async execute(id: string) {
    return await this.findPlayerService.find(id);
  }
}

