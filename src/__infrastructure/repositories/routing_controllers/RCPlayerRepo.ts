import { BaseEntity, FindOptionsWhere } from 'typeorm';
import PlayerEntity from './entities/PlayerEntity';

export default class PlayerRepo extends BaseEntity {
  async add(data: Partial<PlayerEntity>) {
    return PlayerEntity.save(data);
  }
  async findById(id: string) {
    return PlayerEntity.findOne({ where: { id } });
  }
  async findAll(query: Partial<PlayerEntity>) {
    return PlayerEntity.find({
      where: query as FindOptionsWhere<PlayerEntity>,
    });
  }
  async updateOne(id: string, body: Partial<PlayerEntity>) {
    const updated = await PlayerEntity.update(id, body);
    if (updated.affected && updated.affected > 0) {
      return this.findById(id);
    }
    return updated;
  }
}
