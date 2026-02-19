import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BookingStatus, Role } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { ListBookingsQueryDto } from "./dto/list-bookings-query.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: AuthRequestUser, dto: CreateBookingDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException("Only students can create booking requests");
    }

    const slot = await this.prisma.mentorAvailability.findUnique({
      where: { id: dto.availabilityId },
    });

    if (!slot) {
      throw new NotFoundException("Availability slot not found");
    }

    if (slot.isBooked || slot.startTime <= new Date()) {
      throw new BadRequestException("Availability slot is not bookable");
    }

    const hasActiveBooking = await this.prisma.booking.findFirst({
      where: {
        availabilityId: slot.id,
        status: { in: [BookingStatus.PENDING, BookingStatus.ACCEPTED] },
      },
    });

    if (hasActiveBooking) {
      throw new BadRequestException("Availability slot is already booked");
    }

    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          studentId: user.id,
          mentorId: slot.mentorId,
          availabilityId: slot.id,
          note: dto.note,
        },
      });

      await tx.mentorAvailability.update({
        where: { id: slot.id },
        data: { isBooked: true },
      });

      return booking;
    });
  }

  listForStudent(user: AuthRequestUser, query: ListBookingsQueryDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException("Only students can view student bookings");
    }

    return this.prisma.booking.findMany({
      where: { studentId: user.id },
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
        availability: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  listForMentor(user: AuthRequestUser, query: ListBookingsQueryDto) {
    if (user.role !== Role.MENTOR) {
      throw new ForbiddenException("Only mentors can view mentor bookings");
    }

    return this.prisma.booking.findMany({
      where: { mentorId: user.id },
      skip: query.skip,
      take: query.take,
      include: {
        student: {
          select: {
            id: true,
            email: true,
            studentProfile: true,
          },
        },
        availability: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(user: AuthRequestUser, bookingId: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { availability: true },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (user.role !== Role.ADMIN && booking.mentorId !== user.id) {
      throw new ForbiddenException("You cannot update this booking");
    }

    if (dto.status !== BookingStatus.ACCEPTED && dto.status !== BookingStatus.REJECTED) {
      throw new BadRequestException("Mentors can only accept or reject bookings");
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: dto.status },
      });

      if (dto.status === BookingStatus.REJECTED) {
        await tx.mentorAvailability.update({
          where: { id: booking.availabilityId },
          data: { isBooked: false },
        });
      }

      return updatedBooking;
    });
  }

  async cancelByStudent(user: AuthRequestUser, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.studentId !== user.id) {
      throw new ForbiddenException("You cannot cancel this booking");
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException("Only pending bookings can be cancelled");
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.CANCELLED },
      });

      await tx.mentorAvailability.update({
        where: { id: booking.availabilityId },
        data: { isBooked: false },
      });

      return updatedBooking;
    });
  }
}
