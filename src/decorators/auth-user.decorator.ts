import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const reflector = new Reflector();
    const isPublic = reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) return; // Nếu là public route, không trả về user

    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.user;
  })();
}
