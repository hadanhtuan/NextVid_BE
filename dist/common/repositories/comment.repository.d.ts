import { CreateCommentDto } from '../../comment/dto/create-comment.dto';
import { DeleteCommentDto } from '../../comment/dto/delete-comment.dto';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { Comment } from '../entities/comment.entity';
import { User } from '../entities/user.entity';
export declare class CommentRepository extends Repository<Comment> {
    private dataSource;
    constructor(dataSource: DataSource);
    createComment(dto: CreateCommentDto, user: User, blog: Blog): Promise<Number>;
    getCommentByBlog(blogId: number): Promise<Comment[]>;
    deleteComment(dto: DeleteCommentDto, user: User): Promise<void>;
}
