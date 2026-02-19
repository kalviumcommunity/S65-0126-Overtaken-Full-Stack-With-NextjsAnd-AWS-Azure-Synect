import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestUser } from '../interfaces/auth-request-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthRequestUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthRequestUser }>();
    return request.user;
  },
);
