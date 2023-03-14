import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
  
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Blog } from './blog.entity';
import { UserRelation } from './user-relation.entity';

@Entity({ name: 'User' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column() 
  full_name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string; 

  @Column()
  salt: string;

  @Column({nullable: true,})
  provider_type: string;

  @Column({nullable: true,})
  provider_id: string;

  @OneToMany((type) => Blog, (blog) => blog.user, { eager: true })
  blogs: Blog[];  //không cần cái này cũng được

  @OneToMany((type) => UserRelation, (relation) => relation.follower, {
    eager: true,
  })
  follows: UserRelation[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
