import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { CreateAvailabilityDto } from "./dto/create-availability.dto";
import { ListAvailabilityQueryDto } from "./dto/list-availability-query.dto";
import { MentorAvailabilityService } from "./mentor-availability.service";

@Controller("mentor-availability")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MentorAvailabilityController {
  constructor(private readonly availabilityService: MentorAvailabilityService) {}

  @Post()
  @Roles(Role.MENTOR)
  create(@CurrentUser() user: AuthRequestUser, @Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(user, dto);
  }

  @Get("me")
  @Roles(Role.MENTOR)
  listMine(@CurrentUser() user: AuthRequestUser, @Query() query: ListAvailabilityQueryDto) {
    return this.availabilityService.listMine(user, query);
  }

  @Get()
  listPublic(@Query() query: ListAvailabilityQueryDto) {
    return this.availabilityService.listPublic(query);
  }

  @Delete(":id")
  remove(@CurrentUser() user: AuthRequestUser, @Param("id") id: string) {
    return this.availabilityService.remove(user, id);
  }
}
