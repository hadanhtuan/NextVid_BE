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
exports.CrawlDataService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crawl_data_dto_1 = require("./dto/crawl-data-dto");
const blog_repository_1 = require("../common/repositories/blog.repository");
const user_repository_1 = require("../common/repositories/user.repository");
const user_entity_1 = require("../common/entities/user.entity");
const blog_entity_1 = require("../common/entities/blog.entity");
const bcrypt = require("bcrypt");
const cloudinary_1 = require("cloudinary");
const fs = require('fs');
const path = require('path');
let data = require('./data.json');
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../common/enum");
let CrawlDataService = class CrawlDataService {
    constructor(blogRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }
    async crawlDataByUsername(username) {
        var _a;
        const options = {
            method: 'GET',
            url: 'https://tiktok-api6.p.rapidapi.com/user/videos',
            params: { username },
            headers: {
                'X-RapidAPI-Key': '09eb2540b4msha179fbc58b564bap13ebc9jsn018bbe200a17',
                'X-RapidAPI-Host': 'tiktok-api6.p.rapidapi.com',
            },
        };
        cloudinary_1.v2.config({
            cloud_name: 'dhshtvtrl',
            api_key: '779359292484378',
            api_secret: 'o0_WRq0vULdf3lMZvGOBuzA5KLE',
        });
        const response = await axios_1.default.request(options);
        const resData = response.data;
        let newData = new crawl_data_dto_1.CrawDataDto();
        if ((resData === null || resData === void 0 ? void 0 : resData.videos.length) > 0) {
            newData.username = resData.username;
            newData.avatar = resData.videos[0].avatar_thumb;
            newData.fullname = resData.videos[0].author_name;
            const result = await cloudinary_1.v2.uploader.upload(resData.videos[0].avatar_thumb);
            newData.avatar_cloudinary = result.url;
            newData.username = resData.username;
            newData.avatar = resData.videos[0].avatar_thumb;
            newData.fullname = resData.videos[0].author_name;
            for (const video of resData.videos) {
                try {
                    let url_cloudinary = '';
                    const result2 = await cloudinary_1.v2.uploader.upload(video.download_url, {
                        resource_type: 'video',
                    });
                    console.log(result2);
                    url_cloudinary = result2.url;
                    if (((_a = newData.videos) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        newData.videos.push({
                            description: video.description,
                            url: video.download_url,
                            url_cloudinary,
                            isSave: false,
                        });
                    }
                    else {
                        newData.videos = [
                            {
                                description: video.description,
                                url: video.download_url,
                                url_cloudinary,
                                isSave: false,
                            },
                        ];
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        if ((data === null || data === void 0 ? void 0 : data.length) > 0)
            data.push(Object.assign({}, newData));
        else
            data = [newData];
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data));
    }
    async saveToCloudinary() { }
    async saveDataToDatabase() {
        for (let i = 0; i < data.length; i++) {
            const user = new user_entity_1.User();
            user.username = data[i].username;
            user.avatar = data[i].avatar_cloudinary;
            user.full_name = data[i].fullname;
            user.email = data[i].username + '@tiktok.gmail.com';
            user.salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.username, user.salt);
            await user.save();
            await Promise.all(data[i].videos.map(async (video) => {
                const blog = new blog_entity_1.Blog();
                blog.access_modifier = enum_1.AccessMod.PUBLIC;
                blog.allow_comment = true;
                blog.caption = video.description;
                blog.video_url = video.url_cloudinary;
                blog.user = user;
                await blog.save();
            }));
        }
    }
};
CrawlDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_repository_1.BlogRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository,
        user_repository_1.UserRepository])
], CrawlDataService);
exports.CrawlDataService = CrawlDataService;
//# sourceMappingURL=crawl-data.service.js.map