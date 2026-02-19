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
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { CreateInternshipDto } from "./dto/create-internship.dto";
import { ListInternshipsQueryDto } from "./dto/list-internships-query.dto";
import { UpdateInternshipDto } from "./dto/update-internship.dto";
import { InternshipsService } from "./internships.service";

@Controller("internships")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InternshipsController {
  constructor(private readonly internshipsService: InternshipsService) {}

  @Post()
  @Roles(Role.STUDENT)
  create(@CurrentUser() user: AuthRequestUser, @Body() dto: CreateInternshipDto) {
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
  update(
    @CurrentUser() user: AuthRequestUser,
    @Param("id") id: string,
    @Body() dto: UpdateInternshipDto,
  ) {
    return this.internshipsService.update(user, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: AuthRequestUser, @Param("id") id: string) {
    return this.internshipsService.remove(user, id);
  }
}
