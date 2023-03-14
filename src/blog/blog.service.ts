import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../common/entities/blog.entity';
import { Like } from '../common/entities/likes.entity';
import { UserRelation } from '../common/entities/user-relation.entity';
import { User } from '../common/entities/user.entity'; 
import { AccessMod } from '../common/enum';

import { CommentRepository } from '../common/repositories/comment.repository';
import { LikeRepository } from '../common/repositories/like.repository';
import { BlogRepository } from '../common/repositories/blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto copy';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository) private blogRepository: BlogRepository,
    @InjectRepository(CommentRepository) private commentRepository: CommentRepository,
    @InjectRepository(LikeRepository) private likeRepository: LikeRepository,
  ) {}

  async createBlog(dto: CreateBlogDto, user: User): Promise<Blog> {
    const { caption, video, access_modifier, allow_comment } = dto;
    const blog = new Blog();
    blog.caption = caption;
    blog.video_url = video;
    blog.access_modifier = access_modifier;
    blog.allow_comment = allow_comment;

    blog.user = user;

    await blog.save();
    return blog;
  }

  async fetchBlogByRelation(user: User) {
    const arrBLog = await this.fetchBlog(user);
    const allBlog = await this.fetchAllBlog();
    this.shuffle(arrBLog);
    this.shuffle(allBlog);

    for (var i = 0; i < arrBLog.length; ++i) {
      for (var j = i + 1; j < arrBLog.length; ++j) {
        if (arrBLog[i].id === arrBLog[j].id) arrBLog.splice(j--, 1);
      }
    }
    return arrBLog;
  }

  async fetchBlogById(id: number): Promise<Blog> {
    const comments = await this.commentRepository.createQueryBuilder('cmt')
    .leftJoinAndSelect('cmt.user', 'user')
    .where('cmt.blogId = :id', { id }).getMany()

    let blog = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.likes', 'like')
      .where('blog.id = :id', { id })
      .getOne();

    blog.comments = comments
    return blog;
  }

  async updateBlog(dto: UpdateBlogDto, user: User, id: number) {
    const { caption, topic, access_modifier, allow_comment } = dto;

    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException();
    if (blog.userId !== user.id) throw new Error('Wrong authen');

    if (caption) blog.caption = caption;
    if (access_modifier) blog.access_modifier = access_modifier;
    if (allow_comment !== blog.allow_comment)
      blog.allow_comment = allow_comment;
    console.log(blog.allow_comment);
    await blog.save();
    return blog;
  }

  async deleteBlog(user: User, id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (blog.userId !== user.id) throw new Error('Wrong authen');
    blog.access_modifier = AccessMod.DELETE;
    await blog.save();
  }

  async fetchBlogByPage() {
    const result = await this.blogRepository
      .createQueryBuilder('blog')
      .select('COUNT(*)')
      .getRawOne();
    const size = result.count;

    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.likes', 'like')
      .getMany();
    let resBlogs = [];
    for (let i = 0; i < 3; i++) {
      let ran = Math.floor(Math.random() * size) + 1;
      resBlogs.push(blogs[ran]);
    }
    this.shuffle(resBlogs);
    return resBlogs;
  }

  shuffle(array: Blog[]): Blog[] {
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

  
  async fetchBlogByUserLikes( userId: number) {

    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.user', 'user')
      .leftJoinAndSelect('blog.likes', 'like')
      .where('like.userId = :id', {id: userId})
      .getMany();

    return blogs;
  }

  async likeBlog(blogId: number, user: User): Promise<void> {
    const blog = await this.blogRepository.findOneBy({ id: blogId });
    const isExit = await this.likeRepository.findOneBy({
      userId: user.id,
      blogId: blog.id,
    });
    if (isExit) return;

    this.likeRepository.likeBlog(blog, user);
  }

  async unlikeBlog(blogId: number, user: User): Promise<void> {
    const blog = await this.blogRepository.findOneBy({ id: blogId });

    const isExit = await this.likeRepository.findOneBy({
      userId: user.id,
      blogId: blog.id,
    });
    if (!isExit) return;

    this.likeRepository.unlikeBlog(blog, user);
  }

  async getBlogLikes(blogId: number): Promise<Like[]> {
    return this.likeRepository.getBlogLikes(blogId);
  }

  async fetchBlog(user: User | undefined) {
    let arrBLog: Blog[] = [];
    if (user) {
      arrBLog = user.blogs;
      await Promise.all(
        user.follows.map(async (item: UserRelation) => {
          const blogs: Blog[] = await this.blogRepository
            .createQueryBuilder('Blog')
            .where('Blog.userId = :id', { id: item.followingId })
            .andWhere('Blog.access_modifier != :acc_mod', {
              acc_mod: AccessMod.DELETE,
            })
            .andWhere('Blog.access_modifier != :acc_mod_pri', {
              acc_mod_pri: AccessMod.PRIVATE,
            })
            .getMany();
          arrBLog = [...arrBLog, ...blogs];
        }),
      );
    }
    return arrBLog;
  }

  async fetchAllBlog() {
    let blogs: Blog[] = await this.blogRepository.findBy({
      access_modifier: AccessMod.PUBLIC,
    });
    return blogs;
  }

  async fetchRandomBlog(id: number): Promise<Number> {
    const result = await this.blogRepository
      .createQueryBuilder('blog')
      .select('COUNT(*)')
      .getRawOne();
    const size = result.count;
    let ran = id;
    while (ran == id) {
      ran = Math.floor(Math.random() * size) + 1;
    }
    return ran;
  }

  async fetchBlogBySearchText(text: string): Promise<Blog[]> {
    const blogs: Blog[] = await this.blogRepository
      .createQueryBuilder('Blog')
      .leftJoinAndSelect('Blog.user', 'user')
      .leftJoinAndSelect('Blog.likes', 'like')
      .where('Blog.caption LIKE :caption', { caption: `%${text}%` })
      .andWhere('Blog.access_modifier != :acc_mod', {
        acc_mod: AccessMod.DELETE,
      })
      .andWhere('Blog.access_modifier != :acc_mod_pri', {
        acc_mod_pri: AccessMod.PRIVATE,
      })
      .getMany();

    return blogs;
  }
  
}
