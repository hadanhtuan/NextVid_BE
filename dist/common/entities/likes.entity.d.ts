import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';
export declare class Like extends BaseEntity {
    userId: number;
    blogId: number;
    user: User;
    blog: Blog;
}
