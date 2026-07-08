import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { LocalizedStringDto } from '../../../common/dto/localized-string.dto';

export class CreateJobDto {
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  category!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  location!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  employmentType!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description!: LocalizedStringDto;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}
