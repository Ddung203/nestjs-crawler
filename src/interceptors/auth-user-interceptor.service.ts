import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ContextProvider } from "../providers";

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }

    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
