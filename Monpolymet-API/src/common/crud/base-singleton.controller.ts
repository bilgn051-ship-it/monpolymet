import { Body, Get, Put } from '@nestjs/common';
import { BaseSingletonService } from './base-singleton.service';

/** Generic controller for a singleton: `GET` reads, `PUT` upserts. */
export class BaseSingletonController<T> {
  constructor(protected readonly service: BaseSingletonService<T>) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Put()
  update(@Body() dto: any) {
    return this.service.update(dto);
  }
}
