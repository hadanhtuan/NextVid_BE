import { Interface } from "readline";

export class CrawDataDto {
  username: string;
  fullname: string;
  avatar: string;
  avatar_cloudinary: string;
  videos: [
    {
      description: string;
      url: string;
      url_cloudinary: string;
      isSave: boolean;
    }
  ]
} 