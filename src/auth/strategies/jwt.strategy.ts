import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload-interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  } 

  async validate(payload: JwtPayload) {
    const user = await this.authService.getUser(payload.id)
    return user;
  }
}
