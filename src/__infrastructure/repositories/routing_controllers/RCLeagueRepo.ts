import { BaseEntity, FindOptionsWhere } from 'typeorm';
import LeagueEntity from './entities/LeagueEntity';

export default class LeagueRepo extends BaseEntity {
  async add(data: Partial<LeagueEntity>) {
    return LeagueEntity.save(data);
  }
  async findById(id: string) {
    return LeagueEntity.findOne({ where: { id } });
  }
  async findAll(query: Partial<LeagueEntity>) {
    return LeagueEntity.find({
      where: query as FindOptionsWhere<LeagueEntity>,
    });
  }
  async updateOne(id: string, body: Partial<LeagueEntity>) {
    const updated = await LeagueEntity.update(id, body);
    if (updated.affected && updated.affected > 0) {
      return this.findById(id);
    }
    return updated;
  }
}
