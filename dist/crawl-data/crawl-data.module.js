"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlDataModule = void 0;
const common_1 = require("@nestjs/common");
const blog_repository_1 = require("../common/repositories/blog.repository");
const user_repository_1 = require("../common/repositories/user.repository");
const crawl_data_controller_1 = require("./crawl-data.controller");
const crawl_data_service_1 = require("./crawl-data.service");
let CrawlDataModule = class CrawlDataModule {
};
CrawlDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [crawl_data_controller_1.CrawlDataController],
        providers: [crawl_data_service_1.CrawlDataService, blog_repository_1.BlogRepository, user_repository_1.UserRepository]
    })
], CrawlDataModule);
exports.CrawlDataModule = CrawlDataModule;
//# sourceMappingURL=crawl-data.module.js.map