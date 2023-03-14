import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../common/entities/blog.entity';
import { User } from '../common/entities/user.entity';
import { AccessMod } from '../common/enum';
import { UserRepository } from '../common/repositories/user.repository';
import { UserRelation } from '../common/entities/user-relation.entity';
import { RelationRepository } from '../common/repositories/relation.repository';
import { BlogRepository } from '../common/repositories/blog.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(BlogRepository) private blogRepository: BlogRepository,
    @InjectRepository(RelationRepository)
    private relationRepository: RelationRepository,
  ) {}

  async getUser(id): Promise<User> {
    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.likes', 'like')
      .where('blog.userId = :id', { id })
      .getMany();

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Not Found User');

    let arrBlog: Blog[] = [];
    blogs.map((blog: Blog, idx: number) => {
      if (blog.access_modifier != AccessMod.PRIVATE) arrBlog.push(blog);
    });
    delete user.blogs;
    user.blogs = blogs;
    delete user.password;
    delete user.salt;

    return user;
  }

  async follow(user: User, id: number): Promise<void> {
    const followingUser: User = await this.getUser(id);

    if (!followingUser) throw new NotFoundException('Not found user');

    const isExit = await this.relationRepository.findOneBy({
      followerId: user.id,
      followingId: id,
    });
    if (isExit) return;

    const ur = new UserRelation();
    ur.follower = user;
    ur.following = followingUser;

    await ur.save();
  }

  async unFollow(user: User, id: number): Promise<void> {
    await this.relationRepository.delete({
      followerId: user.id,
      followingId: id,
    });

    // const res =  await query.execute()

    // .where('UserRelation.followerId = :id1 AND UserRelation.followingId = :id2', {id1: user.id, id2: id})
    // .getOne()
  }

  async getFollows(user: User): Promise<UserRelation[]> {
    return await this.relationRepository
      .createQueryBuilder('userRelation')
      .where('userRelation.followerId = :id', { id: user.id })
      .getMany();
  }

  async getSuggest(): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .getMany();
    this.shuffle(users);
    const res: User[] = users.slice(0, 5);
    return res;
  }

  shuffle(array: User[]): User[] {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  async getUserFollower(id: number): Promise<number> {
    const num = await this.relationRepository
      .createQueryBuilder('relation')
      .select('COUNT(*)')
      .where('relation.following = :id', { id })
      .getRawOne();
    return num;
  }

  async fetchUserBySearchText(text: string): Promise<User[]> {
    const users: User[] = await this.userRepository
      .createQueryBuilder('User')
      .where('User.username LIKE :name', { name: `%${text}%` })
      .getMany();

    return users;
  }
}
