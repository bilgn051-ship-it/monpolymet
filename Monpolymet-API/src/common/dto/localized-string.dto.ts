import { IsOptional, IsString } from 'class-validator';

export class LocalizedStringDto {
  @IsOptional()
  @IsString()
  mn?: string;

  @IsOptional()
  @IsString()
  en?: string;
}
