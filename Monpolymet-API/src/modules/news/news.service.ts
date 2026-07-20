import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsArticle, NewsArticleDocument } from './schemas/news-article.schema';
import { CreateNewsArticleDto } from './dto/create-news-article.dto';
import { UpdateNewsArticleDto } from './dto/update-news-article.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsArticle.name)
    private readonly model: Model<NewsArticleDocument>,
  ) {}

  /** Admin list — includes drafts. Newest first. */
  findAll() {
    return this.model.find().sort({ publishedAt: -1 }).exec();
  }

  /** Public list — published only. */
  findPublished() {
    return this.model.find({ isPublished: true }).sort({ publishedAt: -1 }).exec();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).exec();
    if (!doc) throw new NotFoundException('News article not found');
    return doc;
  }

  create(dto: CreateNewsArticleDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateNewsArticleDto) {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('News article not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('News article not found');
    return { id };
  }

  /** Atomically increment view count and return updated doc. */
  async incrementViews(id: string) {
    const doc = await this.model
      .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('News article not found');
    return doc;
  }

  count() {
    return this.model.countDocuments().exec();
  }
}
