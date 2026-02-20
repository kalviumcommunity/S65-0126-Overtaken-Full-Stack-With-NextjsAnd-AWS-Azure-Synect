import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { Role } from "@prisma/client";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import type { AuthRequestUser } from "../auth/interfaces/auth-request-user.interface";
import {
  completeUploadSchema,
  createUploadUrlSchema,
  type CompleteUploadInput,
  type CreateUploadUrlInput,
} from "./schemas/uploads.schema";
import { UploadsService } from "./uploads.service";

@Controller("uploads")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("presign")
  @UsePipes(new ZodValidationPipe(createUploadUrlSchema))
  createPresignUrl(@CurrentUser() user: AuthRequestUser, @Body() payload: CreateUploadUrlInput) {
    return this.uploadsService.createPresignedUrl(user, payload);
  }

  @Post("complete")
  @UsePipes(new ZodValidationPipe(completeUploadSchema))
  completeUpload(@CurrentUser() user: AuthRequestUser, @Body() payload: CompleteUploadInput) {
    return this.uploadsService.completeUpload(user, payload);
  }

  @Get("me")
  listMyUploads(@CurrentUser() user: AuthRequestUser) {
    return this.uploadsService.listMyUploads(user);
  }

  @Get("validate-storage")
  @Roles(Role.ADMIN)
  validateStorage() {
    return this.uploadsService.validateStorageConfig();
  }
}
