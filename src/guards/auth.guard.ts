import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";
import { I18nService } from "nestjs-i18n";

import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { ContextProvider } from "../providers";

@Injectable()
export class AuthGuard extends NestAuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const canActivate = (await super.canActivate(context)) as boolean;
      if (canActivate) {
        const request = context.switchToHttp().getRequest();
        ContextProvider.setAuthUser(request.user);
      }
      return canActivate;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(this.i18n.translate("errors.auth.invalidCredentials"));
    }
  }
}
