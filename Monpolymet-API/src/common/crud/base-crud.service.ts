import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

/**
 * Generic CRUD for a list collection. Concrete services extend it with a
 * bound model. Sorting defaults to `order` asc then newest — matches the
 * `order` field the ordered collections carry.
 */
export class BaseCrudService<T> {
  constructor(
    protected readonly model: Model<T>,
    protected readonly sort: Record<string, 1 | -1> = { order: 1, createdAt: -1 },
    protected readonly notFoundMessage = 'Record not found',
  ) {}

  findAll() {
    return this.model.find().sort(this.sort).exec();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).exec();
    if (!doc) throw new NotFoundException(this.notFoundMessage);
    return doc;
  }

  create(dto: any) {
    return this.model.create(dto);
  }

  async update(id: string, dto: any) {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException(this.notFoundMessage);
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException(this.notFoundMessage);
    return { id };
  }

  count() {
    return this.model.countDocuments().exec();
  }
}
