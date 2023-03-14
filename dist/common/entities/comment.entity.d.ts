import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';
export declare class Comment extends BaseEntity {
    id: number;
    content: string;
    display: boolean;
    userId: number;
    blogId: number;
    parentId: number;
    parent: Comment;
    children: Comment[];
    user: User;
    blog: Blog;
}
