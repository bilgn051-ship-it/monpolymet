import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ApplicationStatus,
  JobApplication,
  JobApplicationDocument,
} from './schemas/job-application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(JobApplication.name)
    private readonly model: Model<JobApplicationDocument>,
  ) {}

  findAll() {
    return this.model
      .find()
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const doc = await this.model.findById(id).populate('job', 'title').exec();
    if (!doc) throw new NotFoundException('Application not found');
    return doc;
  }

  create(dto: CreateApplicationDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateApplicationDto) {
    const doc = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!doc) throw new NotFoundException('Application not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.model.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Application not found');
    return { id };
  }

  count() {
    return this.model.countDocuments().exec();
  }

  countNew() {
    return this.model.countDocuments({ status: ApplicationStatus.NEW }).exec();
  }
}
