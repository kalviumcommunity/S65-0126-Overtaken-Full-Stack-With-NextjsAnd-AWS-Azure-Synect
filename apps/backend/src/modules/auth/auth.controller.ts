import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { CurrentUser } from "./decorators/current-user.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import type { AuthRequestUser } from "./interfaces/auth-request-user.interface";
import { loginSchema, signupSchema } from "./schemas/auth.schema";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() dto: { email: string; password: string; role: "STUDENT" | "MENTOR" | "ADMIN" }) {
    return this.authService.signup(dto);
  }

  @Post("login")
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthRequestUser) {
    return this.authService.getProfile(user.id);
  }
}
