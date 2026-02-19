import { IsEnum, IsOptional } from "class-validator";
import { InternshipStatus } from "@prisma/client";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";

export class ListInternshipsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(InternshipStatus)
  status?: InternshipStatus;
}
