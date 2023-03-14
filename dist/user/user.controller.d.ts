import { UserService } from './user.service';
import { User } from '../common/entities/user.entity';
import { UserRelation } from '../common/entities/User-Relation.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(user: any): Promise<User>;
    getFollows(user: any): Promise<UserRelation[]>;
    follow(id: number, user: any): Promise<void>;
    unFollow(id: number, user: any): Promise<void>;
    getSuggest(): Promise<User[]>;
    getUserFollower(id: number): Promise<number>;
    fetchUserBySearchText(text: string): Promise<User[]>;
    getUser(id: number): Promise<User>;
}
