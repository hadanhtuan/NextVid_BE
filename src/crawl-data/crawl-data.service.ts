import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CrawDataDto } from './dto/crawl-data-dto';
import { BlogRepository } from '../common/repositories/blog.repository';
import { UserRepository } from '../common/repositories/user.repository';
import { User } from '../common/entities/user.entity';
import { Blog } from '../common/entities/blog.entity';
import * as bcrypt from 'bcrypt';
import { v2 } from 'cloudinary';

const fs = require('fs');
const path = require('path');

let data = require('./data.json');
import * as data1 from './data.json';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessMod } from '../common/enum';
@Injectable()
export class CrawlDataService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async crawlDataByUsername(username: string): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://tiktok-api6.p.rapidapi.com/user/videos',  
      params: {username},
      headers: {
        'X-RapidAPI-Key': '09eb2540b4msha179fbc58b564bap13ebc9jsn018bbe200a17', 
        'X-RapidAPI-Host': 'tiktok-api6.p.rapidapi.com'
      }
    };

    v2.config({
      cloud_name: 'dhshtvtrl',
      api_key: '779359292484378',
      api_secret: 'o0_WRq0vULdf3lMZvGOBuzA5KLE', 
    });

    const response = await axios.request(options);

    const resData = response.data;

    let newData = new CrawDataDto();
    if (resData?.videos.length > 0) {
      newData.username = resData.username;
      newData.avatar = resData.videos[0].avatar_thumb;
      newData.fullname = resData.videos[0].author_name;

      const result = await v2.uploader.upload(resData.videos[0].avatar_thumb);
      newData.avatar_cloudinary = result.url;
      newData.username = resData.username;
      newData.avatar = resData.videos[0].avatar_thumb;
      newData.fullname = resData.videos[0].author_name;

      for (const video of resData.videos) { 
        let url_cloudinary = '';
        const result2 = await v2.uploader.upload(video.download_url, {
          resource_type: 'video',
        });
        console.log(result2);
        url_cloudinary = result2.url;
        if (newData.videos?.length > 0) {
          newData.videos.push({ 
            description: video.description,
            url: video.download_url,
            url_cloudinary,
            isSave: false,
          }); 
        } else {
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
    }
    if (data?.length > 0) data.push({ ...newData });
    else data = [newData];
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data));
  }
 
  async saveToCloudinary() {}

  async saveDataToDatabase(): Promise<void> {
    for (let i = 0; i < data.length; i++) { 
      const user = new User();
      user.username = data[i].username;
      user.avatar = data[i].avatar_cloudinary;
      user.full_name = data[i].fullname;
      user.email = data[i].username + '@tiktok.gmail.com';
      user.salt = await bcrypt.genSalt(); 
      user.password = await bcrypt.hash(user.username, user.salt); //password == username

      await user.save();

      await Promise.all(  
        data[i].videos.map(async (video) => {
          const blog = new Blog();
          blog.access_modifier = AccessMod.PUBLIC;
          blog.allow_comment = true;
          blog.caption = video.description;
          blog.video_url = video.url_cloudinary; 
          blog.user = user;

          await blog.save();
        }),
      );
    }
  }
}
