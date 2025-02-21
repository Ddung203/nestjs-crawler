import { Body, Controller, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Public } from "src/decorators/public.decorator";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/signIn.dto";
import { ChangePasswordDto } from "./dtos/changePassword.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signUp")
  @Public()
  async signUp(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.signUp(CreateUserDto);
  }

  @Post("signIn")
  @Public()
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Patch("change-password")
  async changePassword(@Body() changePassword: ChangePasswordDto) {
    return this.authService.changePassword(changePassword);
  }
}
