import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { FacebookStrategy, GoogleStrategy } from 'passport-facebook';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FacebookAuthService extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:4000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile, done: Function) {
    console.log(profile)
    return { userId: profile.id, email: profile.emails[0].value };
  }
}
