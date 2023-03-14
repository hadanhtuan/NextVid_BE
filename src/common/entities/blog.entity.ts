import {BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import {User} from './user.entity'
import { AccessMod } from '../enum';
import { Comment } from './comment.entity';
import { Like } from './likes.entity';

@Entity({name: 'Blog'})
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @Column()
  video_url: string;

  @Column()
  access_modifier: AccessMod  //enum

  @Column() 
  allow_comment: boolean

  @Column()  // cái bảng quan hệ tạo ra có userId
  userId: number;

  @ManyToOne(type=> User, user=>user.blogs, {eager: false})
  user: User;

  @OneToMany((type) => Comment, (cmt) => cmt.blog, {
    eager: true,
  })
  comments: Comment[]

  @OneToMany((type) => Like, (l) => l.blog, {
    eager: true,
  })
  likes: Like[]
  
}
 