import { Model } from 'mongoose';

/**
 * Generic accessor for a singleton document identified by a unique `key`
 * (About/Home/HSE/Careers page content, site settings). `get` returns null
 * until the first save; `update` upserts, so the admin creates-on-first-save.
 */
export class BaseSingletonService<T> {
  constructor(
    protected readonly model: Model<T>,
    protected readonly key: string,
  ) {}

  get() {
    return this.model.findOne({ key: this.key } as any).exec();
  }

  update(dto: any) {
    return this.model
      .findOneAndUpdate(
        { key: this.key } as any,
        { ...dto, key: this.key },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
      )
      .exec();
  }
}
