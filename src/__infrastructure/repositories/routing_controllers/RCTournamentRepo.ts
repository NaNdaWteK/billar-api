import { BaseEntity, FindOptionsWhere } from 'typeorm';
import TournamentEntity from './entities/TournamentEntity';

export default class TournamentRepo extends BaseEntity {
  async add(data: Partial<TournamentEntity>) {
    return TournamentEntity.save(data);
  }
  async findById(id: string) {
    return TournamentEntity.findOne({ where: { id } });
  }
  async findAll(query: Partial<TournamentEntity>) {
    return TournamentEntity.find({
      where: query as FindOptionsWhere<TournamentEntity>,
    });
  }
  async updateOne(id: string, body: Partial<TournamentEntity>) {
    const updated = await TournamentEntity.update(id, body);
    if (updated.affected && updated.affected > 0) {
      return this.findById(id);
    }
    return updated;
  }
}
