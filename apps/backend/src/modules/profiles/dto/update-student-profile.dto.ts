import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateStudentProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  university?: string;

  @IsOptional()
  @IsString()
  program?: string;

  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  graduationYear?: number;

  @IsOptional()
  @IsString()
  bio?: string;
}
