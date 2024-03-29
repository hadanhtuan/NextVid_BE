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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const blog_entity_1 = require("./blog.entity");
const user_relation_entity_1 = require("./user-relation.entity");
let User = class User extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    __metadata("design:type", String)
], User.prototype, "provider_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, }),
    __metadata("design:type", String)
], User.prototype, "provider_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => blog_entity_1.Blog, (blog) => blog.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => user_relation_entity_1.UserRelation, (relation) => relation.follower, {
        eager: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "follows", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'User' }),
    (0, typeorm_1.Unique)(['username'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map