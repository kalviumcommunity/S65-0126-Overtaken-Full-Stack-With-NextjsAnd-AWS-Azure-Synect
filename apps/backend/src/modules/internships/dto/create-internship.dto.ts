import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { InternshipStatus } from '@prisma/client';

export class CreateInternshipDto {
  @IsString()
  company!: string;

  @IsString()
  roleTitle!: string;

  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus;

  @IsOptional()
  @IsUrl()
  applicationLink?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
