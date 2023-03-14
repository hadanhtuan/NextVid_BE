import { BlogRepository } from '../common/repositories/blog.repository';
import { UserRepository } from '../common/repositories/user.repository';
export declare class CrawlDataService {
    private blogRepository;
    private userRepository;
    constructor(blogRepository: BlogRepository, userRepository: UserRepository);
    crawlDataByUsername(username: string): Promise<void>;
    saveToCloudinary(): Promise<void>;
    saveDataToDatabase(): Promise<void>;
}
