import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedStringDto } from '../../../common/dto/localized-string.dto';

export class UpdateTenderDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  category?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  location?: LocalizedStringDto;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  deadlineDate?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
