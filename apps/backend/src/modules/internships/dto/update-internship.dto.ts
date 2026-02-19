import { InternshipStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateInternshipDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  roleTitle?: string;

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
