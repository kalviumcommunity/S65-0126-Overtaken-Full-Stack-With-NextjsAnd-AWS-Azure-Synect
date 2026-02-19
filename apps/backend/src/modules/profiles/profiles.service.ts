import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { AuthRequestUser } from '../auth/interfaces/auth-request-user.interface';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  getMe(user: AuthRequestUser) {
    return this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        role: true,
        studentProfile: true,
        mentorProfile: true,
      },
    });
  }

  updateStudentProfile(user: AuthRequestUser, dto: UpdateStudentProfileDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can update student profile');
    }

    return this.prisma.studentProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...dto,
      },
      update: dto,
    });
  }

  updateMentorProfile(user: AuthRequestUser, dto: UpdateMentorProfileDto) {
    if (user.role !== Role.MENTOR) {
      throw new ForbiddenException('Only mentors can update mentor profile');
    }

    return this.prisma.mentorProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...dto,
      },
      update: dto,
    });
  }

  listMentors() {
    return this.prisma.user.findMany({
      where: { role: Role.MENTOR },
      select: {
        id: true,
        email: true,
        mentorProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
