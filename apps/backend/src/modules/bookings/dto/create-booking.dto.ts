import { IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  availabilityId!: string;

  @IsOptional()
  @IsString()
  note?: string;
}
