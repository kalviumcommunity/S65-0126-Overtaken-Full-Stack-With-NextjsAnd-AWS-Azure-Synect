import { IsEnum, IsOptional } from 'class-validator';
import { InternshipStatus } from '@prisma/client';

export class ListInternshipsQueryDto {
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus;
}
