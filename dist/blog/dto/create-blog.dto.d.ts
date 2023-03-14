import { AccessMod } from '../../common/enum';
export declare class CreateBlogDto {
    caption: string;
    video: string;
    access_modifier: AccessMod;
    allow_comment: boolean;
}
