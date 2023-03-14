import { CrawlDataService } from './crawl-data.service';
export declare class CrawlDataController {
    private crawlDataService;
    constructor(crawlDataService: CrawlDataService);
    crawByUsername(params: any): Promise<void>;
    saveToDataBase(): Promise<void>;
}
