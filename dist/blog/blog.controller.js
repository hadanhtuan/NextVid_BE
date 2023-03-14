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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const update_blog_dto_copy_1 = require("./dto/update-blog.dto copy");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    createBlog(dto, user) {
        return this.blogService.createBlog(dto, user);
    }
    fetchBlogByRelation(user) {
        return this.blogService.fetchBlogByRelation(user);
    }
    updateBlog(dto, id, user) {
        return this.blogService.updateBlog(dto, user, id);
    }
    async fetchRandomBlog(id) {
        return await this.blogService.fetchRandomBlog(id);
    }
    async fetchBlogBySearchText(text) {
        return await this.blogService.fetchBlogBySearchText(text);
    }
    async fetchBlogByPage() {
        return await this.blogService.fetchBlogByPage();
    }
    async fetchBlogByUserLikes(userId) {
        return await this.blogService.fetchBlogByUserLikes(userId);
    }
    async fetchBlogById(id) {
        return await this.blogService.fetchBlogById(id);
    }
    deleteBlog(id, user) {
        return this.blogService.deleteBlog(user, id);
    }
    likeBlog(blogId, user) {
        return this.blogService.likeBlog(blogId, user);
    }
    unlikeBlog(blogId, user) {
        console.log(blogId);
        return this.blogService.unlikeBlog(blogId, user);
    }
    getBlogLikes(blogId) {
        return this.blogService.getBlogLikes(blogId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "fetchBlogByRelation", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_blog_dto_copy_1.UpdateBlogDto, Number, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Get)('/random/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "fetchRandomBlog", null);
__decorate([
    (0, common_1.Get)('/search/:text'),
    __param(0, (0, common_1.Param)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "fetchBlogBySearchText", null);
__decorate([
    (0, common_1.Get)('default'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "fetchBlogByPage", null);
__decorate([
    (0, common_1.Get)('user-liked/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "fetchBlogByUserLikes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "fetchBlogById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    (0, common_1.Post)('/like/:blogId'),
    __param(0, (0, common_1.Param)('blogId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "likeBlog", null);
__decorate([
    (0, common_1.Delete)('/unlike/:blogId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthenticationGuard),
    __param(0, (0, common_1.Param)('blogId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "unlikeBlog", null);
__decorate([
    (0, common_1.Get)('/like/:blogId'),
    __param(0, (0, common_1.Param)('blogId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogLikes", null);
BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map