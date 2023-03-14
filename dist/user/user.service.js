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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../common/enum");
const user_repository_1 = require("../common/repositories/user.repository");
const user_relation_entity_1 = require("../common/entities/user-relation.entity");
const relation_repository_1 = require("../common/repositories/relation.repository");
const blog_repository_1 = require("../common/repositories/blog.repository");
let UserService = class UserService {
    constructor(userRepository, blogRepository, relationRepository) {
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
        this.relationRepository = relationRepository;
    }
    async getUser(id) {
        const blogs = await this.blogRepository
            .createQueryBuilder('blog')
            .leftJoinAndSelect('blog.user', 'user')
            .leftJoinAndSelect('blog.likes', 'like')
            .where('blog.userId = :id', { id })
            .getMany();
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('Not Found User');
        let arrBlog = [];
        blogs.map((blog, idx) => {
            if (blog.access_modifier != enum_1.AccessMod.PRIVATE)
                arrBlog.push(blog);
        });
        delete user.blogs;
        user.blogs = blogs;
        delete user.password;
        delete user.salt;
        return user;
    }
    async follow(user, id) {
        const followingUser = await this.getUser(id);
        if (!followingUser)
            throw new common_1.NotFoundException('Not found user');
        const isExit = await this.relationRepository.findOneBy({
            followerId: user.id,
            followingId: id,
        });
        if (isExit)
            return;
        const ur = new user_relation_entity_1.UserRelation();
        ur.follower = user;
        ur.following = followingUser;
        await ur.save();
    }
    async unFollow(user, id) {
        await this.relationRepository.delete({
            followerId: user.id,
            followingId: id,
        });
    }
    async getFollows(user) {
        return await this.relationRepository
            .createQueryBuilder('userRelation')
            .where('userRelation.followerId = :id', { id: user.id })
            .getMany();
    }
    async getSuggest() {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .getMany();
        this.shuffle(users);
        const res = users.slice(0, 5);
        return res;
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
    async getUserFollower(id) {
        const num = await this.relationRepository
            .createQueryBuilder('relation')
            .select('COUNT(*)')
            .where('relation.following = :id', { id })
            .getRawOne();
        return num;
    }
    async fetchUserBySearchText(text) {
        const users = await this.userRepository
            .createQueryBuilder('User')
            .where('User.username LIKE :name', { name: `%${text}%` })
            .getMany();
        return users;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(blog_repository_1.BlogRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(relation_repository_1.RelationRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        blog_repository_1.BlogRepository,
        relation_repository_1.RelationRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map