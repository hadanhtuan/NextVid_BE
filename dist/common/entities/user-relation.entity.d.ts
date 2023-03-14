import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class UserRelation extends BaseEntity {
    id: number;
    followerId: number;
    followingId: number;
    follower: User;
    following: User;
}
