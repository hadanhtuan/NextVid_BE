import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../../blog/dto/create-blog.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRelation } from '../entities/user-relation.entity';

@Injectable()
export class RelationRepository extends Repository<UserRelation> {
  constructor(private dataSource: DataSource) {
    super(UserRelation, dataSource.createEntityManager());
  }


  // async createBlog(dto: CreateBlogDto, user: User): Promise<Blog>  {
  //   const {caption, video, topic, access_modifier, allow_comment} = dto
  //   const blog = new Blog();
  //   blog.caption = caption
  //   blog.video = video
  //   blog.topic = topic
  //   blog.access_modifier = access_modifier
  //   blog.allow_comment = allow_comment

  //   blog.user = user;

  //   await blog.save()
  //   return blog
  // }
}



