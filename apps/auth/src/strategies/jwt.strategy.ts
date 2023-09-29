import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from 'express';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ITokenPayload } from "../interfaces/token-payload.interface";
import { UserService } from "../users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly userService: UserService) {
    const secretOrKey = configService.get<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authorization,
      ]),
      secretOrKey
    })
  }

  async validate({userId}: ITokenPayload) {
    return await this.userService.getUser({
      _id: userId
    })
  }
}