import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { User } from "./interfaces/user.interface";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
