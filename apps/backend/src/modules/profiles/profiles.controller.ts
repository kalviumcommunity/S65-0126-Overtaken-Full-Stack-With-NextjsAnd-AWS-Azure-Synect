import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import { UpdateMentorProfileDto } from "./dto/update-mentor-profile.dto";
import { UpdateStudentProfileDto } from "./dto/update-student-profile.dto";
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
  updateStudent(@CurrentUser() user: AuthRequestUser, @Body() dto: UpdateStudentProfileDto) {
    return this.profilesService.updateStudentProfile(user, dto);
  }

  @Patch("mentor")
  @Roles(Role.MENTOR)
  updateMentor(@CurrentUser() user: AuthRequestUser, @Body() dto: UpdateMentorProfileDto) {
    return this.profilesService.updateMentorProfile(user, dto);
  }

  @Get("mentors")
  listMentors() {
    return this.profilesService.listMentors();
  }
}
