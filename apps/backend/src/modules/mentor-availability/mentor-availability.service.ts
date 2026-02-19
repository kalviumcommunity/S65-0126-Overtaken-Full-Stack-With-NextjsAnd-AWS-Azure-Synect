import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BookingStatus, Role } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { CreateAvailabilityDto } from "./dto/create-availability.dto";
import { ListAvailabilityQueryDto } from "./dto/list-availability-query.dto";

@Injectable()
export class MentorAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: AuthRequestUser, dto: CreateAvailabilityDto) {
    if (user.role !== Role.MENTOR) {
      throw new ForbiddenException("Only mentors can create availability slots");
    }

    if (dto.endTime <= dto.startTime) {
      throw new BadRequestException("endTime must be after startTime");
    }

    const overlap = await this.prisma.mentorAvailability.findFirst({
      where: {
        mentorId: user.id,
        startTime: { lt: dto.endTime },
        endTime: { gt: dto.startTime },
      },
    });

    if (overlap) {
      throw new BadRequestException("Availability slot overlaps with existing slot");
    }

    return this.prisma.mentorAvailability.create({
      data: {
        mentorId: user.id,
        startTime: dto.startTime,
        endTime: dto.endTime,
      },
    });
  }

  listMine(user: AuthRequestUser, query: ListAvailabilityQueryDto) {
    if (user.role !== Role.MENTOR) {
      throw new ForbiddenException("Only mentors can view their own availability");
    }

    return this.prisma.mentorAvailability.findMany({
      where: { mentorId: user.id },
      skip: query.skip,
      take: query.take,
      orderBy: { startTime: "asc" },
    });
  }

  listPublic(query: ListAvailabilityQueryDto) {
    return this.prisma.mentorAvailability.findMany({
      where: {
        mentorId: query.mentorId,
        isBooked: false,
        startTime: { gt: new Date() },
      },
      skip: query.skip,
      take: query.take,
      include: {
        mentor: {
          select: {
            id: true,
            email: true,
            mentorProfile: true,
          },
        },
      },
      orderBy: { startTime: "asc" },
    });
  }

  async remove(user: AuthRequestUser, availabilityId: string) {
    const slot = await this.prisma.mentorAvailability.findUnique({
      where: { id: availabilityId },
    });

    if (!slot) {
      throw new NotFoundException("Availability slot not found");
    }

    if (slot.mentorId !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException("You cannot remove this slot");
    }

    const activeBooking = await this.prisma.booking.findFirst({
      where: {
        availabilityId,
        status: { in: [BookingStatus.PENDING, BookingStatus.ACCEPTED] },
      },
    });

    if (activeBooking) {
      throw new BadRequestException("Cannot remove slot with active booking request");
    }

    return this.prisma.mentorAvailability.delete({
      where: { id: availabilityId },
    });
  }
}
