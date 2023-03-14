import { Injectable } from '@nestjs/common';
import { FacebookStrategy, GoogleStrategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
  

@Injectable()
export class GoogleAuthService extends PassportStrategy(GoogleStrategy, 'google') {
  constructor() {
    super({
      clientID: 'your-google-client-id',
      clientSecret: 'your-google-client-secret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile, done: Function) {
    return { userId: profile.id, email: profile.emails[0].value };
  }
}
