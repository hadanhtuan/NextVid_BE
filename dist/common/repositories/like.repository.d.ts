import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { Like } from '../entities/likes.entity';
import { User } from '../entities/user.entity';
export declare class LikeRepository extends Repository<Like> {
    private dataSource;
    constructor(dataSource: DataSource);
    likeBlog(blog: Blog, user: User): Promise<void>;
    unlikeBlog(blog: Blog, user: User): Promise<void>;
    getBlogLikes(blogId: number): Promise<Like[]>;
}
