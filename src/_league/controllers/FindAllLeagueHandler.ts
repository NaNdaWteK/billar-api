import { FindOptionsWhere } from 'typeorm';
import LeagueEntity from '../../__infrastructure/repositories/routing_controllers/entities/LeagueEntity';
import FindAllLeagueService from '../services/FindAllLeagueService';

export default class FindAllLeagueHandler {
  private readonly findAllLeagueService;
  constructor() {
    this.findAllLeagueService = new FindAllLeagueService();
  }
  async execute(query: FindOptionsWhere<LeagueEntity>) {
    return (await this.findAllLeagueService.findAll(query)) as LeagueEntity[];
  }
}
