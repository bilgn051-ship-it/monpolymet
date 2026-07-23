import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /** Includes passwordHash — used only by AuthService for password checks. */
  findByEmail(email: string) {
    const cleanEmail = email ? email.trim() : '';
    return this.userModel
      .findOne({
        $or: [
          { email: cleanEmail },
          { email: cleanEmail.toLowerCase() },
          { email: new RegExp(`^${cleanEmail.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') },
        ],
      })
      .exec();
  }

  findAll() {
    return this.userModel
      .find()
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-passwordHash').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.userModel
      .findOne({ email: dto.email.toLowerCase() })
      .exec();
    if (exists) throw new ConflictException('A user with this email already exists');

    const created = await this.userModel.create({
      email: dto.email,
      name: dto.name,
      role: dto.role,
      isActive: dto.isActive ?? true,
      passwordHash: await bcrypt.hash(dto.password, SALT_ROUNDS),
    });
    return this.findById(created.id as string);
  }

  async update(id: string, dto: UpdateUserDto) {
    const { password, ...rest } = dto;
    const patch: Record<string, unknown> = { ...rest };
    if (password) patch.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    if (dto.email) {
      const clash = await this.userModel
        .findOne({ email: dto.email.toLowerCase(), _id: { $ne: id } })
        .exec();
      if (clash) throw new ConflictException('A user with this email already exists');
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, patch, { new: true, runValidators: true })
      .select('-passwordHash')
      .exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return { id };
  }

  count() {
    return this.userModel.countDocuments().exec();
  }
}
