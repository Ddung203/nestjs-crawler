import type { PipeTransform } from "@nestjs/common";
import { applyDecorators, Param, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import type { Type } from "@nestjs/common/interfaces";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

import type { AccountType } from "../constants";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";

export function Auth(roles: AccountType[] = []): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}

export function UUIDParam(property: string, ...pipes: Array<Type<PipeTransform> | PipeTransform>): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: "4" }), ...pipes);
}
