import { AccessMod } from '../../common/enum';
export declare class UpdateBlogDto {
    caption: string;
    topic: string;
    access_modifier: AccessMod;
    allow_comment: boolean;
}
