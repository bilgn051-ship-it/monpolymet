import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Validated shape for every bilingual field in request bodies. Mirrors the
 * LocalizedString Mongoose sub-schema: both languages are required.
 */
export class LocalizedStringDto {
  @IsString()
  @IsNotEmpty()
  mn!: string;

  @IsString()
  @IsNotEmpty()
  en!: string;
}
