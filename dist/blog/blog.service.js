"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entity_1 = require("../common/entities/blog.entity");
const enum_1 = require("../common/enum");
const comment_repository_1 = require("../common/repositories/comment.repository");
const like_repository_1 = require("../common/repositories/like.repository");
const blog_repository_1 = require("../common/repositories/blog.repository");
let BlogService = class BlogService {
    constructor(blogRepository, commentRepository, likeRepository) {
        this.blogRepository = blogRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
    }
    async createBlog(dto, user) {
        const { caption, video, access_modifier, allow_comment } = dto;
        const blog = new blog_entity_1.Blog();
        blog.caption = caption;
        blog.video_url = video;
        blog.access_modifier = access_modifier;
        blog.allow_comment = allow_comment;
        blog.user = user;
        await blog.save();
        return blog;
    }
    async fetchBlogByRelation(user) {
        const arrBLog = await this.fetchBlog(user);
        const allBlog = await this.fetchAllBlog();
        this.shuffle(arrBLog);
        this.shuffle(allBlog);
        for (var i = 0; i < arrBLog.length; ++i) {
            for (var j = i + 1; j < arrBLog.length; ++j) {
                if (arrBLog[i].id === arrBLog[j].id)
                    arrBLog.splice(j--, 1);
            }
        }
        return arrBLog;
    }
    async fetchBlogById(id) {
        const comments = await this.commentRepository.createQueryBuilder('cmt')
            .leftJoinAndSelect('cmt.user', 'user')
            .where('cmt.blogId = :id', { id }).getMany();
        let blog = await this.blogRepository
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.user', 'user')
            .leftJoinAndSelect('blog.likes', 'like')
            .where('blog.id = :id', { id })
            .getOne();
        blog.comments = comments;
        return blog;
    }
    async updateBlog(dto, user, id) {
        const { caption, topic, access_modifier, allow_comment } = dto;
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog)
            throw new exceptions_1.NotFoundException();
        if (blog.userId !== user.id)
            throw new Error('Wrong authen');
        if (caption)
            blog.caption = caption;
        if (access_modifier)
            blog.access_modifier = access_modifier;
        if (allow_comment !== blog.allow_comment)
            blog.allow_comment = allow_comment;
        console.log(blog.allow_comment);
        await blog.save();
        return blog;
    }
    async deleteBlog(user, id) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (blog.userId !== user.id)
            throw new Error('Wrong authen');
        blog.access_modifier = enum_1.AccessMod.DELETE;
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
    shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }
    async fetchBlogByUserLikes(userId) {
        const blogs = await this.blogRepository
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.user', 'user')
            .leftJoinAndSelect('blog.likes', 'like')
            .where('like.userId = :id', { id: userId })
            .getMany();
        return blogs;
    }
    async likeBlog(blogId, user) {
        const blog = await this.blogRepository.findOneBy({ id: blogId });
        const isExit = await this.likeRepository.findOneBy({
            userId: user.id,
            blogId: blog.id,
        });
        if (isExit)
            return;
        this.likeRepository.likeBlog(blog, user);
    }
    async unlikeBlog(blogId, user) {
        const blog = await this.blogRepository.findOneBy({ id: blogId });
        const isExit = await this.likeRepository.findOneBy({
            userId: user.id,
            blogId: blog.id,
        });
        if (!isExit)
            return;
        this.likeRepository.unlikeBlog(blog, user);
    }
    async getBlogLikes(blogId) {
        return this.likeRepository.getBlogLikes(blogId);
    }
    async fetchBlog(user) {
        let arrBLog = [];
        if (user) {
            arrBLog = user.blogs;
            await Promise.all(user.follows.map(async (item) => {
                const blogs = await this.blogRepository
                    .createQueryBuilder('Blog')
                    .where('Blog.userId = :id', { id: item.followingId })
                    .andWhere('Blog.access_modifier != :acc_mod', {
                    acc_mod: enum_1.AccessMod.DELETE,
                })
                    .andWhere('Blog.access_modifier != :acc_mod_pri', {
                    acc_mod_pri: enum_1.AccessMod.PRIVATE,
                })
                    .getMany();
                arrBLog = [...arrBLog, ...blogs];
            }));
        }
        return arrBLog;
    }
    async fetchAllBlog() {
        let blogs = await this.blogRepository.findBy({
            access_modifier: enum_1.AccessMod.PUBLIC,
        });
        return blogs;
    }
    async fetchRandomBlog(id) {
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
    async fetchBlogBySearchText(text) {
        const blogs = await this.blogRepository
            .createQueryBuilder('Blog')
            .leftJoinAndSelect('Blog.user', 'user')
            .leftJoinAndSelect('Blog.likes', 'like')
            .where('Blog.caption LIKE :caption', { caption: `%${text}%` })
            .andWhere('Blog.access_modifier != :acc_mod', {
            acc_mod: enum_1.AccessMod.DELETE,
        })
            .andWhere('Blog.access_modifier != :acc_mod_pri', {
            acc_mod_pri: enum_1.AccessMod.PRIVATE,
        })
            .getMany();
        return blogs;
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_repository_1.BlogRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_repository_1.CommentRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(like_repository_1.LikeRepository)),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository,
        comment_repository_1.CommentRepository,
        like_repository_1.LikeRepository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map