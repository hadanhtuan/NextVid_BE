import { Controller, Get, Param, Post } from '@nestjs/common';
import axios from 'axios';
import { CrawDataDto } from './dto/crawl-data-dto';
import { BlogRepository } from '../common/repositories/blog.repository';
import { UserRepository } from '../common/repositories/user.repository';
import { User } from '../common/entities/user.entity';
import { Blog } from '../common/entities/blog.entity';
import { CrawlDataService } from './crawl-data.service';


let data = require('./data.json')
import * as data1 from './data.json'

@Controller('crawl-data')
export class CrawlDataController {
  constructor(private crawlDataService: CrawlDataService) {}
  @Get(':username')
  async crawByUsername(@Param() params) {  //craw data from tiktok by username
    return this.crawlDataService.crawlDataByUsername(params.username)
    
  }

  @Post('/save')
  async saveToDataBase() {  //take data from data.json and save to postgredb
    return await this.crawlDataService.saveDataToDatabase()
  }
}
