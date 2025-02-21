import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ApiConfigService } from "../../shared/services/api-config.service";
import type { AccountType } from "../../constants";
import { TokenType } from "../../constants";
import { User } from "../users/interfaces/user.interface";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: { userId: string; role: AccountType; type: TokenType }): Promise<User> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException("Invalid token type");
    }

    const user = await this.usersService.findOne({
      _id: args.userId,
      isBanned: false,
      role: args.role,
    });

    if (!user || user.role !== args.role) {
      throw new UnauthorizedException("You do not have permission to perform this action!");
    }

    return user;
  }
}
