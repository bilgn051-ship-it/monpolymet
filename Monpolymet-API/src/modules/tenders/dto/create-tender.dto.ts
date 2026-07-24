import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedStringDto } from '../../../common/dto/localized-string.dto';

export class CreateTenderDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  category!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  location!: LocalizedStringDto;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  deadlineDate!: string;

  @IsString()
  @IsOptional()
  pdfUrl?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
