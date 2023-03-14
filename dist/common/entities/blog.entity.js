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
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const enum_1 = require("../enum");
const comment_entity_1 = require("./comment.entity");
const likes_entity_1 = require("./likes.entity");
let Blog = class Blog extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "caption", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "video_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "access_modifier", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Blog.prototype, "allow_comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Blog.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.blogs, { eager: false }),
    __metadata("design:type", user_entity_1.User)
], Blog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => comment_entity_1.Comment, (cmt) => cmt.blog, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Blog.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => likes_entity_1.Like, (l) => l.blog, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Blog.prototype, "likes", void 0);
Blog = __decorate([
    (0, typeorm_1.Entity)({ name: 'Blog' })
], Blog);
exports.Blog = Blog;
//# sourceMappingURL=blog.entity.js.map