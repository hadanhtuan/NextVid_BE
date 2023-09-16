import { Controller, UseGuards,  Request, Get, Post, Body, Delete, Param, Patch, Query, ParseIntPipe , UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthenticationGuard } from './guards/auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 
  @Post('/signup')
  signUp(@Body(ValidationPipe) createAccountDto: CreateAccountDto): Promise<void> {
    return this.authService.signUp(createAccountDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string, id: number, username: string, avatar: string, follows: any, blogs: any}> {
    return this.authService.signIn(authCredentialsDto)
  }

  //TODO: In case use passport-facebook: front end send accessToken and backend have 2 route: 'facebook' and 'facebook/callback'
  // request first come to 'facebook' route and go through useguard('facebook') to get data from facebook and after that it will 
  // redirect to 'facebook/callback' route, implement code in this func
  @Post('/facebook')
  async facebookAuth(@Body() body: {accessToken: string}): Promise<{accessToken: string, id: number, username: string, avatar: string, follows: any, blogs: any}>  {
    return await this.authService.facebookAuth(body.accessToken);
  }

  @Post('/google')
  async googleAuth(@Body() body: {accessToken: string}): Promise<{accessToken: string, id: number, username: string, avatar: string, follows: any, blogs: any}>  {
    return await this.authService.googleAuth(body.accessToken);
  }

  @Post('/twitter')
  async twitterAuth(@Body() body: {accessToken: string}): Promise<{accessToken: string, id: number, username: string, avatar: string, follows: any, blogs: any}>  {
    return await this.authService.twitterAuth(body.accessToken);
  }

  @Post('/github')
  async githubAuth(@Body() body: {accessToken: string}): Promise<{accessToken: string, id: number, username: string, avatar: string, follows: any, blogs: any}>  {
    return await this.authService.githubAuth(body.accessToken);
  }
}
