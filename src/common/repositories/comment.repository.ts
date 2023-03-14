import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateBlogDto } from '../../blog/dto/create-blog.dto';
import { UpdateBlogDto } from '../../blog/dto/update-blog.dto copy';
import { CreateCommentDto } from '../../comment/dto/create-comment.dto';
import { DeleteCommentDto } from '../../comment/dto/delete-comment.dto';
import { DataSource, Repository } from 'typeorm';
// import { GetTaskFilterDto } from './dto/get-search-task.dto';
import { Blog } from '../entities/blog.entity';
import { Comment } from '../entities/comment.entity';
import { UserRelation } from '../entities/user-relation.entity';
import { User } from '../entities/user.entity';
import { AccessMod } from '../enum';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async createComment(
    dto: CreateCommentDto,
    user: User,
    blog: Blog,
  ):  Promise<Number> {
    const { content, parentId } = dto;
    const comment = new Comment();
    comment.content = content;
    comment.user = user;
    comment.blog = blog;
    console.log(parentId);
    if (parentId) {
      const parent = await this.findOneBy({ id: parentId });
      if (!parent) throw new NotFoundException();

      comment.parent = parent;
    }
    await comment.save();
    return comment.id;
  }

  async getCommentByBlog(blogId: number): Promise<Comment[]> {
    // const comments = await this.findBy({blogId})
    const comments = await this.createQueryBuilder('Comment')
      .select('comment')
      .from(Comment, 'comment')
      .where('comment.blogId = :blogId', { blogId })
      .andWhere('comment.display = :display', {display: true})
      .getMany();

    return comments;
  }

  async deleteComment(dto: DeleteCommentDto, user: User) {
    const { blogId, commentId } = dto;
    const comment = await this.delete({ id: commentId, blogId });
    // if (!comment) throw new NotFoundException();

    // if(comment.userId != user.id) throw new Error('Not Authorize')

    // comment.display = false;
    // await comment.save();
  }
}
