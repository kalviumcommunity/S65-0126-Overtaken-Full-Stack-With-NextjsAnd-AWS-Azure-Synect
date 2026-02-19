import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { AuthRequestUser } from '../auth/interfaces/auth-request-user.interface';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { ListInternshipsQueryDto } from './dto/list-internships-query.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';

@Injectable()
export class InternshipsService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: AuthRequestUser, dto: CreateInternshipDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can create internships');
    }

    return this.prisma.internship.create({
      data: {
        studentId: user.id,
        ...dto,
      },
    });
  }

  listMine(user: AuthRequestUser, query: ListInternshipsQueryDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can view internships');
    }

    return this.prisma.internship.findMany({
      where: {
        studentId: user.id,
        status: query.status,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOne(user: AuthRequestUser, internshipId: string) {
    const internship = await this.prisma.internship.findUnique({
      where: { id: internshipId },
    });

    if (!internship) {
      throw new NotFoundException('Internship not found');
    }

    if (user.role !== Role.ADMIN && internship.studentId !== user.id) {
      throw new ForbiddenException('You do not have access to this internship');
    }

    return internship;
  }

  async update(
    user: AuthRequestUser,
    internshipId: string,
    dto: UpdateInternshipDto,
  ) {
    await this.getOne(user, internshipId);

    return this.prisma.internship.update({
      where: { id: internshipId },
      data: dto,
    });
  }

  async remove(user: AuthRequestUser, internshipId: string) {
    await this.getOne(user, internshipId);

    return this.prisma.internship.delete({
      where: { id: internshipId },
    });
  }
}
