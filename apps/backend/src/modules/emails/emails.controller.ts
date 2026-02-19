import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { Role } from "@prisma/client";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import {
  sendNotificationEmailSchema,
  sendWelcomeEmailSchema,
  type SendNotificationEmailInput,
  type SendWelcomeEmailInput,
} from "./schemas/emails.schema";
import { EmailsService } from "./emails.service";

@Controller("emails")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post("welcome")
  @UsePipes(new ZodValidationPipe(sendWelcomeEmailSchema))
  sendWelcome(@Body() payload: SendWelcomeEmailInput) {
    return this.emailsService.sendWelcomeEmail(payload);
  }

  @Post("notification")
  @UsePipes(new ZodValidationPipe(sendNotificationEmailSchema))
  sendNotification(@Body() payload: SendNotificationEmailInput) {
    return this.emailsService.sendNotificationEmail(payload);
  }
}
