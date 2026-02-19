import { IsOptional, IsString } from "class-validator";

export class UpdateMentorProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  expertise?: string;
}
