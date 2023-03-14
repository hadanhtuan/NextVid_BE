import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { Comment } from '../entities/comment.entity';
import { Like } from '../entities/likes.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class LikeRepository extends Repository<Like> {
  constructor(private dataSource: DataSource) {
    super(Like, dataSource.createEntityManager());
  }

  async likeBlog(blog: Blog, user: User) {
    const like = new Like()
    like.blog = blog;
    like.user = user;

    console.log(blog)

    await like.save()
  }
  
  async unlikeBlog(blog: Blog, user: User) {
    await this.delete({blogId: blog.id, userId: user.id})
  }

  async getBlogLikes(blogId: number): Promise<Like[]> {
    const likes  = await this.findBy({blogId})
    return likes
  }
}
