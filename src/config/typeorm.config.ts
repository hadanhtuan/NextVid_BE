import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME,
  port: process.env.PORT as any, 
  password: process.env.PASSWORD, 
  database: process.env.DB_NAME,
  url: process.env.URL,
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,  
  autoLoadEntities: true,
}; 
     