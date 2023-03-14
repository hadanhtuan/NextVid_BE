import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { AccessMod } from '../enum';
import { Comment } from './comment.entity';
import { Like } from './likes.entity';
export declare class Blog extends BaseEntity {
    id: number;
    caption: string;
    video_url: string;
    access_modifier: AccessMod;
    allow_comment: boolean;
    userId: number;
    user: User;
    comments: Comment[];
    likes: Like[];
}
