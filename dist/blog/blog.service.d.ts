import { Blog } from '../common/entities/blog.entity';
import { Like } from '../common/entities/likes.entity';
import { User } from '../common/entities/user.entity';
import { CommentRepository } from '../common/repositories/comment.repository';
import { LikeRepository } from '../common/repositories/like.repository';
import { BlogRepository } from '../common/repositories/blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto copy';
export declare class BlogService {
    private blogRepository;
    private commentRepository;
    private likeRepository;
    constructor(blogRepository: BlogRepository, commentRepository: CommentRepository, likeRepository: LikeRepository);
    createBlog(dto: CreateBlogDto, user: User): Promise<Blog>;
    fetchBlogByRelation(user: User): Promise<Blog[]>;
    fetchBlogById(id: number): Promise<Blog>;
    updateBlog(dto: UpdateBlogDto, user: User, id: number): Promise<Blog>;
    deleteBlog(user: User, id: number): Promise<void>;
    fetchBlogByPage(): Promise<any[]>;
    shuffle(array: Blog[]): Blog[];
    fetchBlogByUserLikes(userId: number): Promise<Blog[]>;
    likeBlog(blogId: number, user: User): Promise<void>;
    unlikeBlog(blogId: number, user: User): Promise<void>;
    getBlogLikes(blogId: number): Promise<Like[]>;
    fetchBlog(user: User | undefined): Promise<Blog[]>;
    fetchAllBlog(): Promise<Blog[]>;
    fetchRandomBlog(id: number): Promise<Number>;
    fetchBlogBySearchText(text: string): Promise<Blog[]>;
}
