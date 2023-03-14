import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities/blog.entity';
export declare class BlogRepository extends Repository<Blog> {
    private dataSource;
    constructor(dataSource: DataSource);
}
