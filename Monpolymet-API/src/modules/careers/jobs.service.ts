import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<JobDocument>,
  ) {}

  findAll() {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  findOpen() {
    return this.jobModel
      .find({ isOpen: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const doc = await this.jobModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Job vacancy not found');
    return doc;
  }

  create(dto: CreateJobDto) {
    return this.jobModel.create(dto);
  }

  async update(id: string, dto: UpdateJobDto) {
    const doc = await this.jobModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('Job vacancy not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.jobModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Job vacancy not found');
    return { id };
  }

  count() {
    return this.jobModel.countDocuments().exec();
  }

  countOpen() {
    return this.jobModel.countDocuments({ isOpen: true }).exec();
  }
}
