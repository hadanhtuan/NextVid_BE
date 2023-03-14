import { Controller, Get, Post, Body, Delete, Param, Patch, Query, ParseIntPipe , UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../common/entities/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { UserRelation } from '../common/entities/User-Relation.entity';

@Controller('user')
export class UserController {

  constructor(private userService: UserService){}


  //get profile
  @Get('')
  @UseGuards(AuthenticationGuard)
  async getProfile(@GetUser() user): Promise<User> {
    delete user.salt
    delete user.password
    return user;
  }

  //get follow list
  @Get('/follow/all')
  @UseGuards(AuthenticationGuard)
  async getFollows( @GetUser() user): Promise<UserRelation[]>{
    return this.userService.getFollows(user)
  }
  
  //follow
  @Post('follow/:id')
  @UseGuards(AuthenticationGuard)
  async follow(@Param('id', ParseIntPipe) id: number, @GetUser() user): Promise<void> {
    this.userService.follow(user, id)
  }  

  //unfollow
  @Delete('unfollow/:id')
  @UseGuards(AuthenticationGuard)
  async unFollow(@Param('id', ParseIntPipe) id: number, @GetUser() user): Promise<void> {
    this.userService.unFollow(user, id)
  }

  //get suggested account
  @Get('/suggest')
  async getSuggest(): Promise<User[]> {
    return this.userService.getSuggest()
  }

  //get user follower nums
  @Get('/follower/:id')
  async getUserFollower(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return await this.userService.getUserFollower(id)
  }
  
  @Get('/search/:text')
  async fetchUserBySearchText(@Param('text') text: string):  Promise<User[]> {
    return await this.userService.fetchUserBySearchText(text)
  } 


  //get user
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getUser(id)
  }

  //edit account

}
