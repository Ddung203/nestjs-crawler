import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = Symbol.for("isPublic");

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
