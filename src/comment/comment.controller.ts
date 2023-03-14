import { Controller, Request, Get, Post, Body, Delete, Param, Patch, Query, ParseIntPipe , UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { Comment } from '../common/entities/comment.entity';
import { DeleteCommentDto } from './dto/delete-comment.dto';


@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticationGuard)
  createComment(@Body() dto: CreateCommentDto, @GetUser() user): Promise<Number> {
    return this.commentService.createComment(dto, user)
  }

  @Get('/:blogId')
  getCommentByBlog(@Param('blogId', ParseIntPipe) blogId: number): Promise<Comment[]> {
    return this.commentService.getCommentByBlog(blogId)
  }

  @Post('/delete')
  @UseGuards(AuthenticationGuard)
  deleteComment(@Body() dto: DeleteCommentDto, @GetUser() user): Promise<void> {
    return this.commentService.deleteComment(dto, user)
  }
  

} 
