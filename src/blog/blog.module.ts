import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from '../common/repositories/blog.repository';
import { Blog } from '../common/entities/blog.entity';
import { LikeRepository } from '../common/repositories/like.repository';
import { CommentRepository } from '../common/repositories/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, LikeRepository, CommentRepository]
})
export class BlogModule {}


