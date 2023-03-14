import {BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, JoinColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable, OneToOne} from 'typeorm'
import {User} from './user.entity'
import {Blog} from './blog.entity'

@Entity({name: 'Comment'})
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({nullable: true, default: true})
  display: boolean

  @Column()
  userId: number;

  @Column()
  blogId: number;

  @Column({nullable: true})
  parentId: number;

  @ManyToOne(()=>Comment)
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  children: Comment[];

  @ManyToOne(()=> User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(()=> Blog, blog=>blog.comments, {eager: false})
  @JoinColumn({ name: "blogId" })
  blog: Blog;

}
