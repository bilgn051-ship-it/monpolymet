import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsArticle, NewsArticleSchema } from './schemas/news-article.schema';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NewsArticle.name, schema: NewsArticleSchema }]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService, MongooseModule],
})
export class NewsModule {}
