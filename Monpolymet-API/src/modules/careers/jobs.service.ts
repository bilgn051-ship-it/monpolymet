import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly model: Model<JobDocument>,
  ) {}

  /** Admin list — includes closed vacancies. */
  findAll() {
    return this.model.find().sort({ createdAt: -1 }).exec();
  }

  /** Public list — open vacancies only. */
  findOpen() {
    return this.model.find({ isOpen: true }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).exec();
    if (!doc) throw new NotFoundException('Job not found');
    return doc;
  }

  create(dto: CreateJobDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateJobDto) {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('Job not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Job not found');
    return { id };
  }

  count() {
    return this.model.countDocuments().exec();
  }

  countOpen() {
    return this.model.countDocuments({ isOpen: true }).exec();
  }
}
