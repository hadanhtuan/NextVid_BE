import { BlogService } from './blog.service';
import { Blog } from '../common/entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto copy';
import { Like } from '../common/entities/likes.entity';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    createBlog(dto: CreateBlogDto, user: any): Promise<Blog>;
    fetchBlogByRelation(user: any): Promise<Blog[]>;
    updateBlog(dto: UpdateBlogDto, id: number, user: any): Promise<Blog>;
    fetchRandomBlog(id: number): Promise<Number>;
    fetchBlogBySearchText(text: string): Promise<Blog[]>;
    fetchBlogByPage(): Promise<any[]>;
    fetchBlogByUserLikes(userId: number): Promise<Blog[]>;
    fetchBlogById(id: number): Promise<Blog>;
    deleteBlog(id: number, user: any): Promise<void>;
    likeBlog(blogId: number, user: any): Promise<void>;
    unlikeBlog(blogId: number, user: any): Promise<void>;
    getBlogLikes(blogId: number): Promise<Like[]>;
}
