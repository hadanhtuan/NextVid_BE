import { Controller, Request, Get, Post, Body, Delete, Param, Patch, Query, ParseIntPipe , UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../common/entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdateBlogDto } from './dto/update-blog.dto copy';
import { Like } from '../common/entities/likes.entity';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  
  
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticationGuard)
  createBlog(@Body() dto: CreateBlogDto, @GetUser() user): Promise<Blog> {
    return this.blogService.createBlog(dto, user)
  }
  //if not use getuser decorator
  // createTask(@Body() dto: CreateBlogDto, @Request() request): Promise<Blog> {
  //   return this.BlogService.createBlog(dto, request.user)
  // }

  @Get('/')
  @UseGuards(AuthenticationGuard)
   fetchBlogByRelation(@GetUser() user) {
    return this.blogService.fetchBlogByRelation(user)
  } 

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticationGuard)
  updateBlog(@Body() dto: UpdateBlogDto, @Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.blogService.updateBlog(dto, user, id)
  }

  @Get('/random/:id')
  async fetchRandomBlog(@Param('id', ParseIntPipe) id: number):  Promise<Number> {
    return await this.blogService.fetchRandomBlog(id)
  } 

  @Get('/search/:text')
  async fetchBlogBySearchText(@Param('text') text: string):  Promise<Blog[]> {
    return await this.blogService.fetchBlogBySearchText(text)
  } 


  
  @Get('default')
  async fetchBlogByPage() {
    return await this.blogService.fetchBlogByPage()
  }

  @Get('user-liked/:userId')
  async fetchBlogByUserLikes(@Param('userId', ParseIntPipe) userId: number) {
    return await this.blogService.fetchBlogByUserLikes(userId)
  }
  
  @Get(':id')
  async fetchBlogById(@Param('id', ParseIntPipe) id: number):  Promise<Blog> {
    return await this.blogService.fetchBlogById(id)
  } 
 

  @Delete('/:id')
  @UseGuards(AuthenticationGuard) 
  deleteBlog(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.blogService.deleteBlog(user, id)
  }

  @UseGuards(AuthenticationGuard)
  @Post('/like/:blogId')
  likeBlog(@Param('blogId', ParseIntPipe) blogId: number, @GetUser() user) {
    return this.blogService.likeBlog(blogId, user)
  }

  
  @Delete('/unlike/:blogId')
  @UseGuards(AuthenticationGuard)
  unlikeBlog(@Param('blogId', ParseIntPipe) blogId: number, @GetUser() user) {
    console.log(blogId)
    return this.blogService.unlikeBlog(blogId, user)
  }

  @Get('/like/:blogId')
  getBlogLikes(@Param('blogId', ParseIntPipe) blogId: number): Promise<Like[]> {
    return this.blogService.getBlogLikes(blogId)
  }
}
