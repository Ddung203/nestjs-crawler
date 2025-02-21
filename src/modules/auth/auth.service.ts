import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { generateHash, generateShortInt } from "src/common/utils";
import { AccountType, TokenType } from "src/constants";
import { ApiConfigService } from "src/shared/services/api-config.service";
import { NestRedisService } from "../redis/redis.service";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { UsersService } from "../users/users.service";
import { SignInDto } from "./dtos/signIn.dto";
import { TokenPayloadDto } from "./dtos/token-payload.dto";
import { ChangePasswordDto } from "./dtos/changePassword.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    private readonly nestRedisService: NestRedisService,
  ) {}

  async createAccessToken(data: { role: AccountType; userId: string }) {
    await this.nestRedisService.deleteKeysByPattern(`${data.userId}:*`);

    const rId = `${data.userId}:${generateShortInt()}`;
    await this.nestRedisService.setJson(rId, data, this.configService.authConfig.jwtExpirationTime);

    const accessToken = await this.jwtService.signAsync(
      {
        rId,
        type: TokenType.ACCESS_TOKEN,
      },
      {
        expiresIn: this.configService.authConfig.jwtExpirationTime,
      },
    );

    return new TokenPayloadDto(accessToken);
  }

  async signUp(dto: CreateUserDto) {
    const existUser = await this.usersService.findOne({
      $or: [{ email: dto.email }, { phoneNumber: dto.phoneNumber }],
    });

    if (existUser) {
      throw new ConflictException("errors.auth.credentialAlreadyExists");
    }

    const createdUser = await this.usersService.create(dto);

    if (!createdUser) {
      throw new InternalServerErrorException("errors.data.createFailed");
    }

    const token = await this.createAccessToken({
      userId: createdUser._id,
      role: createdUser.role as AccountType,
    });

    return { user: createdUser, token };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findUserByPhoneNumber(signInDto.phoneNumber);

    if (!user || !user.validatePassword(signInDto.password)) {
      throw new UnauthorizedException("errors.auth.invalidCredentials");
    }

    const token = await this.createAccessToken({
      userId: user._id,
      role: user.role as AccountType,
    });

    return { user: user.toObject(), token };
  }

  async changePassword(changePassword: ChangePasswordDto) {
    const user = await this.usersService.findUserByPhoneNumber(changePassword.phoneNumber);

    if (!user || !user.validatePassword(changePassword.oldPassword)) {
      throw new UnauthorizedException("errors.auth.invalidCredentials");
    }

    const hashedPassword = generateHash(changePassword.newPassword);

    const updatedUser = await this.usersService.updateUserPassword(user._id, hashedPassword);

    return { user: updatedUser?.toObject() };
  }
}
