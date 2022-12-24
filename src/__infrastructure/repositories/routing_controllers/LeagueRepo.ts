import { BaseEntity } from 'typeorm';
import LeagueEntity from './entities/LeagueEntity';

export default class LeagueRepo extends BaseEntity {
  async add(data: Partial<LeagueEntity>) {
    return LeagueEntity.save(data);
  }
  async findById(id: string) {
    return LeagueEntity.findOne({ where: { id } });
  }
}
