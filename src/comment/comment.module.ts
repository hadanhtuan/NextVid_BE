import { Module } from '@nestjs/common';
import { CommentRepository } from '../common/repositories/comment.repository';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository]
})
export class CommentModule {}
