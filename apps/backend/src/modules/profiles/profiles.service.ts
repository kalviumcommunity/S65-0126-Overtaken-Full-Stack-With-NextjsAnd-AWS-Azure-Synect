import { ForbiddenException, Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { CacheService } from "../../common/cache/cache.service";
import { PrismaService } from "../../database/prisma.service";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { ListMentorsQueryDto } from "./dto/list-mentors-query.dto";
import { UpdateMentorProfileDto } from "./dto/update-mentor-profile.dto";
import { UpdateStudentProfileDto } from "./dto/update-student-profile.dto";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

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
      throw new ForbiddenException("Only students can update student profile");
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

  async updateMentorProfile(user: AuthRequestUser, dto: UpdateMentorProfileDto) {
    if (user.role !== Role.MENTOR) {
      throw new ForbiddenException("Only mentors can update mentor profile");
    }

    const profile = await this.prisma.mentorProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...dto,
      },
      update: dto,
    });

    await this.cache.deleteByPrefix("profiles:mentors:");
    return profile;
  }

  async listMentors(query: ListMentorsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const cacheKey = `profiles:mentors:page:${page}:limit:${limit}`;

    const cached = await this.cache.getJson<
      Array<{
        id: string;
        email: string;
        mentorProfile: {
          id: string;
          userId: string;
          fullName: string | null;
          bio: string | null;
          expertise: string | null;
          createdAt: Date;
          updatedAt: Date;
        } | null;
      }>
    >(cacheKey);

    if (cached) {
      return cached;
    }

    const mentors = await this.prisma.user.findMany({
      where: { role: Role.MENTOR },
      skip: query.skip,
      take: query.take,
      select: {
        id: true,
        email: true,
        mentorProfile: true,
      },
      orderBy: { createdAt: "desc" },
    });

    await this.cache.setJson(cacheKey, mentors);
    return mentors;
  }
}
