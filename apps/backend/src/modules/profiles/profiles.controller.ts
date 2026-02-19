import { Body, Controller, Get, Patch, Query, UseGuards, UsePipes } from "@nestjs/common";
import { Role } from "@prisma/client";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { ListMentorsQueryDto } from "./dto/list-mentors-query.dto";
import { updateMentorProfileSchema, updateStudentProfileSchema } from "./schemas/profiles.schema";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("me")
  me(@CurrentUser() user: AuthRequestUser) {
    return this.profilesService.getMe(user);
  }

  @Patch("student")
  @Roles(Role.STUDENT)
  @UsePipes(new ZodValidationPipe(updateStudentProfileSchema))
  updateStudent(
    @CurrentUser() user: AuthRequestUser,
    @Body()
    dto: {
      fullName?: string;
      university?: string;
      program?: string;
      graduationYear?: number;
      bio?: string;
    },
  ) {
    return this.profilesService.updateStudentProfile(user, dto);
  }

  @Patch("mentor")
  @Roles(Role.MENTOR)
  @UsePipes(new ZodValidationPipe(updateMentorProfileSchema))
  updateMentor(
    @CurrentUser() user: AuthRequestUser,
    @Body() dto: { fullName?: string; bio?: string; expertise?: string },
  ) {
    return this.profilesService.updateMentorProfile(user, dto);
  }

  @Get("mentors")
  listMentors(@Query() query: ListMentorsQueryDto) {
    return this.profilesService.listMentors(query);
  }
}
