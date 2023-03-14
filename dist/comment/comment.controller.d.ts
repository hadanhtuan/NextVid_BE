import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '../common/entities/comment.entity';
import { DeleteCommentDto } from './dto/delete-comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    createComment(dto: CreateCommentDto, user: any): Promise<Number>;
    getCommentByBlog(blogId: number): Promise<Comment[]>;
    deleteComment(dto: DeleteCommentDto, user: any): Promise<void>;
}
