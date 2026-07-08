import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseCrudService } from './base-crud.service';

/**
 * Generic REST controller for a list collection. Concrete controllers extend
 * it and add `@Controller('path')`; the route decorators here are inherited.
 * Bodies are validated by the Mongoose schema (admin-only, authenticated).
 */
export class BaseCrudController<T> {
  constructor(protected readonly service: BaseCrudService<T>) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
