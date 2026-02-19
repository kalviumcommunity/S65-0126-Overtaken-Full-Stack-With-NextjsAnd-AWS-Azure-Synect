import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { ListInternshipsQueryDto } from "./dto/list-internships-query.dto";
import { createInternshipSchema, updateInternshipSchema } from "./schemas/internships.schema";
import { InternshipsService } from "./internships.service";

@Controller("internships")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InternshipsController {
  constructor(private readonly internshipsService: InternshipsService) {}

  @Post()
  @Roles(Role.STUDENT)
  @UsePipes(new ZodValidationPipe(createInternshipSchema))
  create(
    @CurrentUser() user: AuthRequestUser,
    @Body()
    dto: {
      company: string;
      roleTitle: string;
      status?: "APPLIED" | "ACTIVE" | "COMPLETED";
      applicationLink?: string;
      notes?: string;
    },
  ) {
    return this.internshipsService.create(user, dto);
  }

  @Get()
  @Roles(Role.STUDENT)
  listMine(@CurrentUser() user: AuthRequestUser, @Query() query: ListInternshipsQueryDto) {
    return this.internshipsService.listMine(user, query);
  }

  @Get(":id")
  getOne(@CurrentUser() user: AuthRequestUser, @Param("id") id: string) {
    return this.internshipsService.getOne(user, id);
  }

  @Patch(":id")
  @UsePipes(new ZodValidationPipe(updateInternshipSchema))
  update(
    @CurrentUser() user: AuthRequestUser,
    @Param("id") id: string,
    @Body()
    dto: {
      company?: string;
      roleTitle?: string;
      status?: "APPLIED" | "ACTIVE" | "COMPLETED";
      applicationLink?: string;
      notes?: string;
    },
  ) {
    return this.internshipsService.update(user, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: AuthRequestUser, @Param("id") id: string) {
    return this.internshipsService.remove(user, id);
  }
}
