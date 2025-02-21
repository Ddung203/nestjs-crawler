import { SetMetadata } from "@nestjs/common";

import { AccountType } from "src/constants";

export const Roles = (roles: AccountType[]) => SetMetadata("roles", roles);
