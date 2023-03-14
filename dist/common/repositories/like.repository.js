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
exports.LikeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const likes_entity_1 = require("../entities/likes.entity");
let LikeRepository = class LikeRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(likes_entity_1.Like, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async likeBlog(blog, user) {
        const like = new likes_entity_1.Like();
        like.blog = blog;
        like.user = user;
        console.log(blog);
        await like.save();
    }
    async unlikeBlog(blog, user) {
        await this.delete({ blogId: blog.id, userId: user.id });
    }
    async getBlogLikes(blogId) {
        const likes = await this.findBy({ blogId });
        return likes;
    }
};
LikeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], LikeRepository);
exports.LikeRepository = LikeRepository;
//# sourceMappingURL=like.repository.js.map