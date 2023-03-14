import { Module } from '@nestjs/common';
import { BlogRepository } from '../common/repositories/blog.repository';
import { UserRepository } from '../common/repositories/user.repository';
import { CrawlDataController } from './crawl-data.controller';
import { CrawlDataService } from './crawl-data.service';
@Module({
  controllers: [CrawlDataController],
  providers: [CrawlDataService, BlogRepository, UserRepository]
})
export class CrawlDataModule {}
