import {
  Body,
  Controller,
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
import { BookingsService } from "./bookings.service";
import { ListBookingsQueryDto } from "./dto/list-bookings-query.dto";
import { createBookingSchema, updateBookingStatusSchema } from "./schemas/bookings.schema";

@Controller("bookings")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles(Role.STUDENT)
  @UsePipes(new ZodValidationPipe(createBookingSchema))
  create(
    @CurrentUser() user: AuthRequestUser,
    @Body() dto: { availabilityId: string; note?: string },
  ) {
    return this.bookingsService.create(user, dto);
  }

  @Get("student")
  @Roles(Role.STUDENT)
  listForStudent(@CurrentUser() user: AuthRequestUser, @Query() query: ListBookingsQueryDto) {
    return this.bookingsService.listForStudent(user, query);
  }

  @Get("mentor")
  @Roles(Role.MENTOR)
  listForMentor(@CurrentUser() user: AuthRequestUser, @Query() query: ListBookingsQueryDto) {
    return this.bookingsService.listForMentor(user, query);
  }

  @Patch(":id/status")
  @Roles(Role.MENTOR, Role.ADMIN)
  @UsePipes(new ZodValidationPipe(updateBookingStatusSchema))
  updateStatus(
    @CurrentUser() user: AuthRequestUser,
    @Param("id") id: string,
    @Body() dto: { status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" },
  ) {
    return this.bookingsService.updateStatus(user, id, dto);
  }

  @Patch(":id/cancel")
  @Roles(Role.STUDENT)
  cancelByStudent(@CurrentUser() user: AuthRequestUser, @Param("id") id: string) {
    return this.bookingsService.cancelByStudent(user, id);
  }
}
