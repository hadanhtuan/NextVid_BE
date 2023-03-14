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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/jwt/dist");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../common/entities/user.entity");
const user_repository_1 = require("../common/repositories/user.repository");
const bcrypt = require("bcrypt");
const firebase = require("firebase-admin");
const exceptions_1 = require("@nestjs/common/exceptions");
const enum_1 = require("../common/enum");
const crypto = require('crypto');
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: firebase.credential.cert({
                    privateKey: process.env.FIREBASE_PRIVATE_KEY,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    projectId: process.env.FIREBASE_PROJECT_ID,
                }),
            });
        }
    }
    async signUp(createAccountDto) {
        const { username, password, full_name, email, avatar } = createAccountDto;
        const user = new user_entity_1.User();
        user.username = username;
        user.full_name = full_name;
        user.email = email;
        user.avatar = avatar;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            throw new exceptions_1.ConflictException('Username already exits');
        }
    }
    async signIn(authCredentialsDto) {
        const { id, username, avatar, follows, blogs } = await this.validateUserPassword(authCredentialsDto);
        console.log(follows);
        if (!id) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { id, username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken, id, username, avatar, follows, blogs };
    }
    async getUser(id) {
        return await this.userRepository.findOneBy({ id });
    }
    async validateUserPassword(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email });
        if (user && (await user.validatePassword(password)))
            return user;
        else
            return new user_entity_1.User();
    }
    async facebookAuth(accessToken) {
        try {
            const verify = await firebase.auth().verifyIdToken(accessToken, true);
            const userGoogle = await firebase.auth().getUser(verify.uid);
            const isUserExit = await this.userRepository.findOneBy({ provider_type: enum_1.ProviderType.FACEBOOK, provider_id: userGoogle.uid });
            if (isUserExit) {
                const { id, username, avatar, follows, blogs } = isUserExit;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
            else {
                const user = new user_entity_1.User();
                user.avatar = userGoogle.photoURL;
                user.full_name = userGoogle.displayName;
                user.email = userGoogle.email;
                user.salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash('', user.salt);
                let uuid = '';
                while (true) {
                    uuid = crypto.randomBytes(6).toString('hex');
                    let isUsernameExit = await this.userRepository.findOneBy({ username: 'user' + uuid });
                    if (!isUsernameExit)
                        break;
                }
                user.username = 'user' + uuid;
                user.provider_type = enum_1.ProviderType.FACEBOOK;
                user.provider_id = userGoogle.uid;
                await user.save();
                const { id, username, avatar, follows, blogs } = user;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async googleAuth(accessToken) {
        try {
            const verify = await firebase.auth().verifyIdToken(accessToken, true);
            const userGoogle = await firebase.auth().getUser(verify.uid);
            const isUserExit = await this.userRepository.findOneBy({ provider_type: enum_1.ProviderType.GOOGLE, provider_id: userGoogle.uid });
            if (isUserExit) {
                const { id, username, avatar, follows, blogs } = isUserExit;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
            else {
                const user = new user_entity_1.User();
                user.avatar = userGoogle.photoURL;
                user.full_name = userGoogle.displayName;
                user.email = userGoogle.email;
                user.salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash('', user.salt);
                let uuid = '';
                while (true) {
                    uuid = crypto.randomBytes(6).toString('hex');
                    let isUsernameExit = await this.userRepository.findOneBy({ username: 'user' + uuid });
                    if (!isUsernameExit)
                        break;
                }
                user.username = 'user' + uuid;
                user.provider_type = enum_1.ProviderType.GOOGLE;
                user.provider_id = userGoogle.uid;
                await user.save();
                const { id, username, avatar, follows, blogs } = user;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async githubAuth(accessToken) {
        try {
            const verify = await firebase.auth().verifyIdToken(accessToken, true);
            const userGithub = await firebase.auth().getUser(verify.uid);
            const isUserExit = await this.userRepository.findOneBy({ provider_type: enum_1.ProviderType.GITHUB, provider_id: userGithub.uid });
            if (isUserExit) {
                const { id, username, avatar, follows, blogs } = isUserExit;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
            else {
                const user = new user_entity_1.User();
                user.avatar = userGithub.photoURL;
                user.full_name = userGithub.displayName;
                user.email = userGithub.email;
                user.salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash('', user.salt);
                let uuid = '';
                while (true) {
                    uuid = crypto.randomBytes(6).toString('hex');
                    let isUsernameExit = await this.userRepository.findOneBy({ username: 'user' + uuid });
                    if (!isUsernameExit)
                        break;
                }
                user.username = 'user' + uuid;
                user.provider_type = enum_1.ProviderType.GITHUB;
                user.provider_id = userGithub.uid;
                await user.save();
                const { id, username, avatar, follows, blogs } = user;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async twitterAuth(accessToken) {
        try {
            const verify = await firebase.auth().verifyIdToken(accessToken, true);
            const userTwitter = await firebase.auth().getUser(verify.uid);
            const isUserExit = await this.userRepository.findOneBy({ provider_type: enum_1.ProviderType.TWITTER, provider_id: userTwitter.uid });
            if (isUserExit) {
                const { id, username, avatar, follows, blogs } = isUserExit;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
            else {
                const user = new user_entity_1.User();
                user.avatar = userTwitter.photoURL;
                user.full_name = userTwitter.displayName;
                user.email = userTwitter.email;
                user.salt = await bcrypt.genSalt();
                user.password = await bcrypt.hash('', user.salt);
                let uuid = '';
                while (true) {
                    uuid = crypto.randomBytes(6).toString('hex');
                    let isUsernameExit = await this.userRepository.findOneBy({ username: 'user' + uuid });
                    if (!isUsernameExit)
                        break;
                }
                user.username = 'user' + uuid;
                user.provider_type = enum_1.ProviderType.TWITTER;
                user.provider_id = userTwitter.uid;
                await user.save();
                const { id, username, avatar, follows, blogs } = user;
                const payload = { id, username };
                const appAccessToken = this.jwtService.sign(payload);
                return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        dist_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map