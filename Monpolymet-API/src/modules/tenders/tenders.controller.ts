import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TendersService } from './tenders.service';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Get()
  findAll() {
    return this.tendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTenderDto) {
    return this.tendersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTenderDto) {
    return this.tendersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendersService.remove(id);
  }
}
