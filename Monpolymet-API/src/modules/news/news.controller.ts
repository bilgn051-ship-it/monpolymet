import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsArticleDto } from './dto/create-news-article.dto';
import { UpdateNewsArticleDto } from './dto/update-news-article.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly news: NewsService) {}

  @Get()
  findAll() {
    return this.news.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.news.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateNewsArticleDto) {
    return this.news.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsArticleDto) {
    return this.news.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.news.remove(id);
  }
}
