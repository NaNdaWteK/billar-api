import { Player } from '../domain/interfaces';
import FindAllPlayerService from '../services/FindAllPlayerService';

export default class FindAllPlayerHandler {
  private readonly findAllPlayerService;
  constructor() {
    this.findAllPlayerService = new FindAllPlayerService();
  }
  async execute(query: Partial<Player>) {
    return (await this.findAllPlayerService.findAll(query)) as Player[];
  }
}
