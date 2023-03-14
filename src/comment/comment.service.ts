import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../common/entities/comment.entity';
import { CommentRepository } from '../common/repositories/comment.repository';
import { User } from '../common/entities/user.entity';
import { Blog } from '../common/entities/blog.entity';
import { DataSource } from 'typeorm';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository) private commentRepository: CommentRepository,
    private dataSource: DataSource
  ) {}

  async createComment(dto: CreateCommentDto, user: User):  Promise<Number> {
    const {blogId} = dto
    const blog: Blog = await this.dataSource.getRepository(Blog).createQueryBuilder('Blog').select("blog").from(Blog, 'blog').where('blog.id = :blogId', {blogId}).getOne()

    // console.log(blog)
    return this.commentRepository.createComment(dto, user, blog)
  
  }

  async getCommentByBlog(blogId: number)  {  
    const comments = await this.commentRepository.getCommentByBlog(blogId)
    let sortComment = []

    for(let i=0; i<comments.length; i++) {
      if(!comments[i].parentId) {
        comments[i].children = []
        sortComment.push(comments[i])
      }
      else
        for(let j=0; j<sortComment.length; j++) {
          if(comments[i].parentId == sortComment[j].id)
          {
            sortComment[j].children.push(comments[i])
            break;
          }
        }
    }
    return sortComment
  }

  async deleteComment(dto: DeleteCommentDto, user: User): Promise<void> {
    await this.commentRepository.deleteComment(dto, user)
  }

}
