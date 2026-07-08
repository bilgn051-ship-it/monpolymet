import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Public } from '../../common/auth/public.decorator';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applications: ApplicationsService) {}

  /** Public: the website's Careers form submits here without authentication. */
  @Public()
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateApplicationDto) {
    return this.applications.create(dto);
  }

  @Get()
  findAll() {
    return this.applications.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applications.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.applications.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applications.remove(id);
  }
}
