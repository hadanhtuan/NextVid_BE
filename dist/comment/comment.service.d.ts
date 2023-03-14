import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from '../common/repositories/comment.repository';
import { User } from '../common/entities/user.entity';
import { DataSource } from 'typeorm';
import { DeleteCommentDto } from './dto/delete-comment.dto';
export declare class CommentService {
    private commentRepository;
    private dataSource;
    constructor(commentRepository: CommentRepository, dataSource: DataSource);
    createComment(dto: CreateCommentDto, user: User): Promise<Number>;
    getCommentByBlog(blogId: number): Promise<any[]>;
    deleteComment(dto: DeleteCommentDto, user: User): Promise<void>;
}
