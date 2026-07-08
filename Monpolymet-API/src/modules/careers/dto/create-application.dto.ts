import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Public CV submission from the Careers form. `status` is never accepted from
 * the client — it defaults to `new` and is only changed by admins afterwards.
 */
export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsMongoId()
  job?: string;
}
