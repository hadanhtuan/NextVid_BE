import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../common/entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserRepository } from '../common/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Strategy } from "passport-jwt";
import { LocalStrategy } from './strategies/local.strategy';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { FacebookAuthService } from './strategies/facebook.strategy';

import * as dotenv from 'dotenv';
dotenv.config();

  
@Module({
  imports: [ 
    PassportModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 7200
      }
    }),
    TypeOrmModule.forFeature([User]) 
  ], 
  controllers: [AuthController], 
  providers: [AuthService, UserRepository, LocalStrategy, JsonWebTokenStrategy, FacebookAuthService]
})
export class AuthModule {}
