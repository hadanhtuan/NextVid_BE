import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { CrawlDataModule } from './crawl-data/crawl-data.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig), BlogModule, UserModule, CommentModule, CrawlDataModule,],
})
export class AppModule {}
 