import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tender, TenderDocument } from './schemas/tender.schema';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Injectable()
export class TendersService {
  constructor(
    @InjectModel(Tender.name) private tenderModel: Model<TenderDocument>,
  ) {}

  async findAll(): Promise<Tender[]> {
    return this.tenderModel.find().sort({ deadlineDate: 1 }).exec();
  }

  async count(): Promise<number> {
    return this.tenderModel.countDocuments().exec();
  }

  async findPublished(): Promise<Tender[]> {
    return this.tenderModel
      .find({ isPublished: true })
      .sort({ deadlineDate: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Tender> {
    const tender = await this.tenderModel.findById(id).exec();
    if (!tender) {
      throw new NotFoundException(`Tender #${id} not found`);
    }
    return tender;
  }

  async create(dto: CreateTenderDto): Promise<Tender> {
    const created = new this.tenderModel(dto);
    return created.save();
  }

  async update(id: string, dto: UpdateTenderDto): Promise<Tender> {
    const updated = await this.tenderModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Tender #${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const res = await this.tenderModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Tender #${id} not found`);
    }
    return { success: true };
  }
}
