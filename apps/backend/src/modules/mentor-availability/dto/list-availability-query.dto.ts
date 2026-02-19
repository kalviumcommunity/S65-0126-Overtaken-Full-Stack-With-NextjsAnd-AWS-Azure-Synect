import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";

export class ListAvailabilityQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  mentorId?: string;
}
