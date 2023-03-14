import {BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable} from 'typeorm'
import {User} from './user.entity'
import {Blog} from './blog.entity'

@Entity({name: 'Likes'})
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  blogId: number;

  @ManyToOne(()=> User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(()=> Blog, blog=>blog.likes, {eager: false})
  @JoinColumn({ name: "blogId" })
  blog: Blog;

}
