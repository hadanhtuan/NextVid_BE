import { BaseEntity } from 'typeorm';
import { Blog } from './blog.entity';
import { UserRelation } from './user-relation.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    full_name: string;
    email: string;
    avatar: string;
    password: string;
    salt: string;
    provider_type: string;
    provider_id: string;
    blogs: Blog[];
    follows: UserRelation[];
    validatePassword(password: string): Promise<boolean>;
}
