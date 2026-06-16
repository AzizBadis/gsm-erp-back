import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  sub: string;
  email: string;
  role: string;
  technicianId?: string;
};

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): AuthUser => {
  return ctx.switchToHttp().getRequest().user;
});
