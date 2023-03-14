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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(comment_entity_1.Comment, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createComment(dto, user, blog) {
        const { content, parentId } = dto;
        const comment = new comment_entity_1.Comment();
        comment.content = content;
        comment.user = user;
        comment.blog = blog;
        console.log(parentId);
        if (parentId) {
            const parent = await this.findOneBy({ id: parentId });
            if (!parent)
                throw new exceptions_1.NotFoundException();
            comment.parent = parent;
        }
        await comment.save();
        return comment.id;
    }
    async getCommentByBlog(blogId) {
        const comments = await this.createQueryBuilder('Comment')
            .select('comment')
            .from(comment_entity_1.Comment, 'comment')
            .where('comment.blogId = :blogId', { blogId })
            .andWhere('comment.display = :display', { display: true })
            .getMany();
        return comments;
    }
    async deleteComment(dto, user) {
        const { blogId, commentId } = dto;
        const comment = await this.delete({ id: commentId, blogId });
    }
};
CommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CommentRepository);
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.repository.js.map