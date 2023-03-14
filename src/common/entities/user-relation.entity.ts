import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm'
import { User } from './user.entity';

@Entity({name: 'UserRelation'})
export class UserRelation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;
  

  @ManyToOne(type=> User, user=>user.follows, {eager: false, onDelete: "CASCADE"})
  follower: User;
  
  @ManyToOne(type=> User)
  following: User;
}
